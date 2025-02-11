const express=require('express');
const zod=require('zod');
const router=express.Router();
const authenticateUser=require('./../middleware/auth');
const jwt=require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient();

const todoSchema = zod.object({
    title: zod.string().min(3, "Title must be at least 3 characters"),
    description:zod.string(),
    completed: zod.boolean().optional()
});


router.post('/todos', authenticateUser, async (req, res) => {
    const body = req.body;
    const validation = todoSchema.safeParse(body);

    if (!validation.success) {
        return res.status(400).json({ msg: "Invalid Inputs", errors: validation.error.errors });
    }

    try {
        const newTodo = await prisma.todo.create({
            data: {
                title: body.title,
                description:body.description,
                completed: body.completed || false,
                userId: req.userId 
            }
        });

        return res.status(201).json({ msg: "Todo created successfully", todo: newTodo });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});


router.get('/todos', authenticateUser, async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            where: { userId: req.userId },
            orderBy:{createdAt:'asc'}
        });

        return res.status(200).json({ todos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});


router.put('/todos/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const validation = todoSchema.safeParse(body); 

    if (!validation.success) {
        return res.status(400).json({ msg: "Invalid Inputs", errors: validation.error.errors });
    }

    try {
        
        const todo = await prisma.todo.findUnique({
            where: { id: parseInt(id) }
        });

        if (!todo || todo.userId !== req.userId) {
            return res.status(403).json({ msg: "Todo not found or unauthorized" });
        }

        const updatedTodo = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: {
                title: body.title || todo.title,
                description:body.description || todo.description,
                completed: body.completed ?? todo.completed ,
                updatedAt:new Date()
            }
        });

        return res.status(200).json({ msg: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

router.delete('/todos/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;

    try {
        
        const todo = await prisma.todo.findUnique({
            where: { id: parseInt(id) }
        });

        if (!todo || todo.userId !== req.userId) {
            return res.status(403).json({ msg: "Todo not found or unauthorized" });
        }

        await prisma.todo.delete({
            where: { id: parseInt(id) }
        });

        return res.status(200).json({ msg: "Todo deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});


router.patch("/todos/toggle/:id",authenticateUser, async (req, res) => {
    const {id}=req.params;
    try {
       
        const todo = await prisma.todo.findUnique({
            where: { id: parseInt(id) }
        });
      
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        todo.completed = !todo.completed; 
        res.status(200).json({ todo });
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
});

module.exports = router;
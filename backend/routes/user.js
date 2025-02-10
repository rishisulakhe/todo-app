const { PrismaClient } = require('@prisma/client');
const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret"; 


const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6, "Password must be at least 6 characters"),
    name: zod.string().min(2, "Name should be at least 2 characters")
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
});


router.post('/signup', async (req, res) => {
    const body = req.body;
    const validation = signupSchema.safeParse(body);

    if (!validation.success) {
        return res.status(400).json({ msg: "Invalid Inputs", errors: validation.error.errors });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { username: body.username }
        });

        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: hashedPassword
            }
        });

        
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);

        return res.status(201).json({ msg: "User created successfully", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});


router.post('/signin', async (req, res) => {
    const body = req.body;
    const validation = signinSchema.safeParse(body);

    if (!validation.success) {
        return res.status(400).json({ msg: "Invalid Inputs", errors: validation.error.errors });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { username: body.username }
        });

        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        
        const isValidPassword = await bcrypt.compare(body.password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);

        return res.status(200).json({ msg: "Signin successful", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;

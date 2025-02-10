const { PrismaClient } = require('@prisma/client');
const express=require('express');
const zod=require('zod');
const router=express.Router();
const client=new PrismaClient();
router.post('/signup',async (req,res)=>{

})

router.post('/signin',async (req,res)=>{

})

module.exports=router;
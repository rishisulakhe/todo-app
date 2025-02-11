const express=require('express');
const cors=require('cors');
const mainRouter=require('./routes/index')
const app=express();
const path=require('path')
app.use(cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use('/api/v1',mainRouter);

app.listen(3000,()=>{
  console.log("Running on port 3000");
})
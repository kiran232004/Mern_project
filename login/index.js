const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const { rawListeners } = require('../models/foods');

app.use(express.json());
app.use(cors());

const usershema=new mongoose.Schema({
    username:{
        type:'String',
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
const User=mongoose.model('user',usershema);

const foodschema=new mongoose.Schema({
    name:{},
    lastEatenDate:{
        type:Date,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    }
})

const Food=mongoose.model('Food',foodschema);

const verifytoken=(req,res,next)=>{
    let token=req.headers['Authorization'];
    token=token.replce('bearer',"");
    if(!token) return res.status(403).json({message:'token not provided'});
    jwt.verify(token,"your_secret_key",(err,decoded)=>
        {
        if(err) return res.status(401).json({message:'failed to authentication'});
        req.user=decoded.userId;
        next();
    })
}

app.post('/api/foods',verifytoken,async(req,res)=>{
    try {
        const {name,lastEatenDate}=req.body;
        const food=new Food({name,
            lastEatenDate:new Date(lastEatenDate),
            user:req.userId
        });
        await food.save();
        res.status(201).json({message:'Food added successfully'});
    } catch (error) {
        console.log.error(error);
        res.status(500).json({error:'failed to add successfully'});
    }
})

app.get('/api/foods',verifytoken,async(req,res)=>{
    try {
        const foods=await food.find({user:req.userId});
        res.json(foods);
    } catch (error) {
        res.status(500).json({
            message:'failed to fetch food data from database'
        })
        
    }
})

app.put('/api/foods/:id',verifytoken,async(req,res)=>{
    try {
        const {lastEatenDate}=req.body;
        const food=await Food.findOneAndUpdate
        ({
            _id:req.params.id,
            user:req.userId,
        },
        {
            lastEatenDate:new Date(lastEatenDate)},
            {new:true}
    );
    if(!food){
        return res.status(404).json({message:'Food not found'});
    }
    res.json(food);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'failed to update food data'});
    }

})


app.post('/api/register',async(req,res)=>{
    try {
        const {username,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const user =new User({username,password:hashedPassword});
        await user.save();
        res.status(201).json({message:'user registered successfully'});         
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'failed to register user'})
    }
})


app.post('/api/login',async(req,res)=>{
    try {
        const{username,password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            return res.statusCode(401).jsin({error:'Invalid credentails'});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({error:'invalid credentails'});
        }
        const token=jwt.sign({userId:user._id},'your_secret_key',{expiresIn:'1h'});
        res.json({token});

    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Failed to login user'});
    }
})


const PORT=process.env.PORT || 3002;

app.listen(PORT,()=>{
    console.log(`Server running on https://localhost:${PORT}`);
})
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
const port=3000;



const foodname=new mongoose.Schema({
    Foodname:{
        type:String,
        required:true,
    },
    DaysSinceIAte:{
        type:Number,
        required:true
    }
})

const Food=mongoose.model('Food',foodname);

module.exports=Food;
const express=require('express');
const app=express();
const port=3000;
const FoodModel=require('./models/foods');
const cors=require('cors');
const mongoose=require('mongoose')



const mongo_URL='mongodb+srv://kiranhp232004:kiranhp232004@cluster0.8cm4d.mongodb.net/';
const connectToDb=async()=>{
    try {
        await mongoose.connect(mongo_URL);
        console.log("connection to mongodb successful");
    } catch (error) {
        console.log("connection to mongodb failed!");
        throw error;
    }
};

connectToDb();




app.use(express.json());
app.use(cors());

app.post('/insert',async(req,res)=>{
    const foodname=req.body.foodname;
    const days=req.body.days;
    const food=new FoodModel({Foodname:foodname,DaysSinceIAte:days})
try {
        await food.save();
        res.send("inserted data");
    } catch (error) {
        console.log(error);
        
    }
})

app.get('/read',async(req,res)=>{
    try {
        const result=await FoodModel.find({});
        res.send(result);

    } catch (error) {
       console.log(error); 
    }
})

app.put('/update',async(req,res)=>{
    const id=req.body.id;
    const newfoodname=req.body.newfoodname;

    try {
        const updatedFood=await FoodModel.findById(id);
        updatedFood.Foodname=newfoodname;
        await updatedFood.save();
        
    } catch (error) {
        console.log(error);
    }
})

app.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id;
    try {
        await FoodModel.findByIdAndDelete(id);
        res.send("deleted data");
     } catch (error) {
        console.log(error);
    }
    
})


app.listen(port,()=>{
    console.log(`Server running on https://localhost:${port}`);
})


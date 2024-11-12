const { default: mongoose, Schema } = require("mongoose");

console.log("hello world!");

const mongo_URL ="mongodb+srv://kiranhp232004:kiranhp232004@cluster0.4vqjb.mongodb.net/"

const connectToMongo=async()=>{
    mongoose.Promise=global.Promise;

    try {
        await mongoose.connect(mongo_URL);
        console.log("conntected to mongoose");
    } catch (error) {
        console.log("Failed to connect to mongoDB",error);
        process.exit(1);
        
    }
}
    const collection_name='student';
    const collection_fields={
        name:String,
        location:String,
        technology:String,
        phone_number:String
    };
    const collection_config={
        timestamps:false
    };
    const schema=mongoose.Schema(collection_fields,collection_config);
    const studentmodel=mongoose.model(collection_name,schema);

    

const createstudents=async()=>{
    await connectToMongo();


    try{
        const student=new studentmodel({
            _id:new mongoose.Types.ObjectId(),
            name:"manoj",
            location:"goa",
            technology:"node.js",
            phone_number:"820570495749"
        })
        const createDocument =await student.save();
        console.log("student created successfully",createDocument);
    }
    catch(error){
        console.log("error creating student",error);
    }
    finally{
        await mongoose.disconnect();
        console.log("disconnected from mongoDb");
    }
}

createstudents()
 const { default: mongoose } = require("mongoose");

const { default: mongoose } = require("mongoose")

console.log("read the data");

const mongo_URL ="mongodb+srv://kiranhp232004:kiranhp232004@cluster0.4vqjb.mongodb.net/"

const connectToMongo=async()=>{
    mongoose.Promise=global.Promise;
    try {
        await mongoose.connect(mongo_URL);
        console.log("conntected to mongoose");
    } catch (error) {
        console.log("failed to connect to mongoose");
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

const schema =new mongoose.Schema(collection_fields,collection_config);
const studentmodel=mongoose.model(collection_name,schema);

const deleterecord=async()=>{
    await connectToMongo();
    try {
        const students=await studentmodel.findOneAndDelete({name:'teju'});
        console.log(students);
        
    } catch (error) {
        console.log("error occured");
        throw error;
    }
    finally{
        console.log("dissconnected the mongoose");
    }
}

deleterecord();


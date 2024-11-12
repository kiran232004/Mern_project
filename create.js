const { default: mongoose } = require("mongoose");

const connectToMongo=async()=>{
    mongoose.Promise=global.Promise;
    
    try {
     await mongoose.connect(mongose_URL);
     console.log("connect to mongoose");    
    } catch (error) {
        console.log("failed to connect to mongoose");
        process.exit(1);     
    }
}

const collection_name='vendors';
const collection_fields={
    id:'String',
    name:'String',
    location:'String',
    rating:'String',
    employee_name:'String'
}
const collection_config={
    timestamps:false
}

const vendorschema=mongoose.Schema(collection_fields,collection_config);
const vendormodel=mongoose.model(collection_name,vendorschema);

const createcollection =async()=>{
    await connectToMongo();
}

createcollection();
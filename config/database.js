const mongoose=require("mongoose");


const connection = async ()=>{
    try{

        await mongoose.connect(process.env.MONGODB_URI,{dbName:process.env.DBNAME});
        console.log('Connected to the database');

    }catch(error){
        console.log(error);
    }
};

module.exports={ connection };
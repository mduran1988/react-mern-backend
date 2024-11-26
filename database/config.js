const mongoose = require("mongoose");

//userNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
const dbConnection = async ()=> {
    try{
        await mongoose.connect(process.env.DB_CNN, {});
        console.log("base de datos conectada...");
    }catch(error){
        console.log(error);
        throw new Error("Error al inicializar a la base de datos");
    }
}

module.exports = dbConnection;
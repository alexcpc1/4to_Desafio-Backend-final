import mongoose from "mongoose";

const messagesCollection = "messages"; //Nombre de la coleccion dentro de la base de datos

//esquema
const messagesSchema = new mongoose.Schema({
    //definimos propiedades del documento para cada usuario
    user:{ type:String, required:true},
    message:{ type:String, required:true},
});

//El modelo permite realizar las operaciones en la coleccion users en la base de datos
export const messagesModel = mongoose.model(messagesCollection,messagesSchema);
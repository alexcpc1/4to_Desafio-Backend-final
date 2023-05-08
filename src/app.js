import express from "express";
import { productRouter } from "./routes/products.routes.js";
import { cartRouter } from "./routes/carts.routes.js";
import {Server} from "socket.io";
import handlebars from "express-handlebars";
import { viewsRouter } from "./routes/views.routes.js";
import { __dirname } from "./utils.js";
import path from "path";
import { realtimeRouter } from "./routes/realtime.routes.js";

import { ProductManager } from "./managers/ProductManager.js";

// configuracion del servidor http
const app = express();
const port = 8080;

//midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

//servidor http
const httpServer = app.listen(port,()=>console.log(`Server listening on port ${port}`));

// //servidor de websocket
const socketServer = new Server(httpServer);

//configuracion del motor de plantillas
app.engine("handlebars",handlebars.engine());//inicializando handlebars
app.set("views",path.join(__dirname,"/views"))//indicamos la ruta del almacenamiento de las vistas
app.set("view engine","handlebars");

//routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/realtimeproducts", realtimeRouter);
 
app.use(viewsRouter);

let products = [];
const productManager = new ProductManager("products.json");

socketServer.on("connection",(productManager)=>{
    try {
        const {title, description, code, price, thumbnail, status, stock, category} = req.body;
        if(!title || !description || !code || !price || !status || !stock || !category){
        return res.status(400).json({status:"error", message:"Los campos no son validos"})
        }
        const newProduct = req.body;
        const productSaved = productManager.addProduct(newProduct);
        res.json({status:"nuevo producto agregado", data:productSaved});
    } catch (error) {
        res.status(400).json({status:"error", message:error.message});
    }
   
    socket.on("product",(data)=>{
        products.push({socketId:socket.id, product:data});
        //emitir el mensaje a todos los clientes conectados
        socketServer.emit("chatMessages",products);
    });
});
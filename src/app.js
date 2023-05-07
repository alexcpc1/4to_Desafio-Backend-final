import express from "express";
import { productRouter } from "./routes/products.routes.js";
import { cartRouter } from "./routes/carts.routes.js";
import {Server} from "socket.io";
import handlebars from "express-handlebars";
import { viewsRouter } from "./routes/views.routes.js";
import { __dirname } from "./utils.js";
import path from "path";

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
app.use("/api/realtimeproducts", viewsRouter);
 
app.use(viewsRouter);

let messages = [];
const productManager = new ProductManager("products.json");

socketServer.on("connection",(socket)=>{
    console.log(`nuevo socket cliente conectado ${socket.id}`);
    //emitir el mensaje al socket actual
    socket.emit("chatMessages",messages);

    socket.on("message",(data)=>{
        messages.push({socketId:socket.id, message:data});
        //emitir el mensaje a todos los clientes conectados
        socketServer.emit("chatMessages",messages);
    });
});
    //     client.on('usuarioNuevo', user => {
//         let listado = usuarios.agregarUsuario(client.id, user)
//         let texto = `Se ha conectado ${user}`
//         io.emit('nuevoUsuario', texto)
//     })

//     socket.on("newProducts",(productManager)=>{
//         const newProduct = req.body;
//         const productSaved = productManager.addProduct(newProduct);
//         messages.push({socketId:socket.id, message:data});
//         //emitir el mensaje a todos los clientes conectados
//         socketServer.emit("messageServer","Producto Agregado");
//     });
// });
//  otra info
// const { Usuarios } = require('./Usuario');
// const usuarios = new Usuarios()

// io.on('connection', client => {
//     console.log('Un usuario se ha conectado')

//     // client.emit('mensaje', 'Bienvenido')

//     // client.on('mensaje', informacion => {
//     //     console.log(informacion)
//     // })

//     client.on('usuarioNuevo', user => {
//         let listado = usuarios.agregarUsuario(client.id, user)
//         let texto = `Se ha conectado ${user}`
//         io.emit('nuevoUsuario', texto)
//     })

//     // client.on('disconnect', () => {
//     //     let usuarioBorrado = usuarios.borrarUsuario(client.id)
//     //     let texto = `Se ha desconectado ${usuarioBorrado.nombre}`
//     //     io.emit('usuarioDesconectado', texto)
//     // })

//     client.on('texto', (text, callback) => {
//         let usuario = usuarios.getUsuario(client.id)
//         let texto = `<b>${usuario.nombre} :</b> ${text} `
//         io.emit('texto', texto)
//         callback()
//     })
// });
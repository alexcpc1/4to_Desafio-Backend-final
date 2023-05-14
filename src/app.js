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
const socket = new Server(httpServer);

//configuracion del motor de plantillas
app.engine("handlebars",handlebars.engine());//inicializando handlebars
app.set("views",path.join(__dirname,"/views"))//indicamos la ruta del almacenamiento de las vistas
app.set("view engine","handlebars");

//routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/realtimeproducts", realtimeRouter);
 
app.use(viewsRouter);

const productManager = new ProductManager("products.json");

socket.on("connection", async (socket) => {
    console.log("id: " + socket.client.conn.id);

const items = await productManager.getProducts();
    socket.emit("productShow", items);

socket.on("item", async (product) => {
    await productManager.addProduct(product);
    const items = await productManager.getProducts();
    socket.emit("productShow", items);
	});
});
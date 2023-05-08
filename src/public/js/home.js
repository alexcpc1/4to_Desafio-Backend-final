import { ProductManager } from "../../managers/ProductManager.js";
console.log("home js")
// console.log("soy el archivo javascript para la pagina del home");
const socketClient = io();

const productManager = new ProductManager("products.json");
console.log(productManager);

const chatBox = document.getElementById("title", "description", "Price", "thumbnail", "code", "stock", "status", "category");
const Agregar = document.getElementById("Agregar");
const Eliminar = document.getElementById("Eliminar");
const productsHistory = document.getElementById("productsHistory");

const sendMessage = ()=>{
    socketClient.emit("products",chatBox.value);
    chatBox.value="";
}

Agregar.addEventListener("click",(e)=>{
    sendMessage()
});

Eliminar.addEventListener("click",(e)=>{
    sendMessage()
});
chatBox.addEventListener("keydown",(evt)=>{
    if(evt.key === "Enter"){
        sendMessage()
    }
});
socketClient.on("messageServer",(data)=>{
    console.log(data)
    setTimeout(() => {
        socketClient.emit("messageClient","confirmacion recibida")
    }, 5000);
});
socketClient.on("chatMessages",(data)=>{
    console.log(data);
    chatHistory.innerHTML="";
    data.forEach(itemMsg => {
        //crear un parrafo por mensaje
        const parrafo = document.createElement("p");
        parrafo.innerHTML=`id:${itemMsg.socketId} >>> ${itemMsg.message}`;
        chatHistory.appendChild(parrafo);
    });
});
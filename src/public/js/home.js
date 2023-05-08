console.log("home js")
// console.log("soy el archivo javascript para la pagina del home");
const socketClient = io();

const chatBox = document.getElementById("chatBox");
const sendButton = document.getElementById("sendButton");
const chatHistory = document.getElementById("chatHistory");

const sendMessage = ()=>{
    socketClient.emit("message",chatBox.value);
    chatBox.value="";
}

sendButton.addEventListener("click",(e)=>{
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
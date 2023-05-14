const socketClient = io();

const productsHistory = document.getElementById("productsHistory");
// const Agregar = document.getElementById("Agregar");
// const Eliminar = document.getElementById("Eliminar");
const productLogs = document.getElementById("productLogs");

productsHistory.addEventListener("submit", (evt) => {
	evt.preventDefault();
	const title = evt.target.elements.title.value;
	const description = evt.target.elements.description.value;
    const price = evt.target.elements.price.value;
	// const thumbnails = evt.target.elements.thumbnails.value;
	const code = evt.target.elements.code.value;
	const stock = evt.target.elements.stock.value;
	const status = evt.target.elements.status.value;
	const category = evt.target.elements.category.value;
	const product = {
		title: title,
		description: description,
        price: price,
        // thumbnails: thumbnails,
		code: code,
        stock: stock,
		status: "true",
		category: category,
	};
	socketClient.emit("item", product);
	productsHistory.reset();
});

// Agregar.addEventListener("click",(e)=>{
//     sendMessage()
// });

// Eliminar.addEventListener("click",(e)=>{
//     sendMessage()
// });

socketClient.on("productShow", (data) => {
	data.forEach((product) => {
		const itemsElements = document.createElement("div");
		itemsElements.id = product.id;
		itemsElements.innerHTML = `
		<h3>Id: ${product.id}</h3>
        <h3>Producto: ${product.title} </h3>
        <h3>Descripcion: ${product.description} </h3>
        <h3>Codigo: ${product.code}</h3>
        <h3>Precio: ${product.price} </h3>
		<h3>Thumbnails: ${product.thumbnails}</h3>
        <h3>Estado: ${product.status} </h3>
        <h3>Stock: ${product.stock}</h3>
        <h3>Categoria: ${product.category}</h3>
		`;
		productLogs.appendChild(itemsElements);
	});
});
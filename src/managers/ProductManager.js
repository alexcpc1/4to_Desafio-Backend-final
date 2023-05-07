import fs from "fs";
import path from "path";
import { __dirname } from "../utils.js";

class ProductManager {
    constructor(pathName){
        this.path=path.join(__dirname,`/files/${pathName}`);
    }
    fileExists(){
        return fs.existsSync(this.path);
    };

    generateId(products){
        let newId;
        if(!products.length){
            newId = 1;
        } else{
            newId = products[products.length - 1].id + 1;
        }
        return newId;
    }

    async addProduct ({title, description, code, price, thumbnail, status, stock, category}){
        
        if(!title || !description || !code || !price || !status || !stock || !category){
         return console.log("Todos los campos deben ser Obligatorios");
        }
        try{
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);
                // Hice un filter para saber si ya existe el code, si es 0 no existe, si esta mayor a 0 si existe
                if (products.filter(obj => obj.code == code).length < 1) { 
                const productId = this.generateId(products);
                var product = new Object();   
                product.title = title;
                product.description = description;
                product.price = price;
                product.thumbnail = thumbnail;
                product.code = code;
                product.stock = stock;     
                product.status =status;  
                product.category = category    
                product.id = productId;
                products.push(product);
                //se actualiza el archivo de los productos          
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                return product;
               } else {
                //En caso de que exista lanza el log y no agrega el producto ni actualiza el archivo de productos!
                return console.log("Ya existe un producto con este Codigo");
               }                
            } else {
                const productId = this.generateId([]);
                product.id = productId;
                // console.log("product: ", product);
                await fs.promises.writeFile(this.path, JSON.stringify([product], null, 2));
                return product;
            };
        } catch(error){
            // console.log(error.message);
            throw new error(error.message);
        }
    };
// obtener productos
    async getProducts(){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                return products;
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async getProductById(id){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const product = products.find(item=>item.id === parseInt(id));
                if(product){
                    return product;
                } else {
                    return null;
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            // console.log(error.message);
            throw new Error(error.message);
        }
    };

    async updateProduct(id, product){
        try{
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);
                const productIndex = products.findIndex(item=>item.id === id);
                if(productIndex>=0){
                    products[productIndex]={
                        ...products[productIndex],
                        ...product
                    }
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                    return `El producto con el id ${id} fue modificado`;
                } else {
                    throw new Error (`El producto con el id ${id} no existe`);
                }
             } else {
                throw new Error("El archivo no existe");
             }
        } catch (error){
            // console.log(error.message);
            throw new Error(error.message);
        }
    };

    async deleteProduct(id){
        try{
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);
                const product = products.find((element)=>element.id === id);
                if(product){
                    const productsFilter = products.filter((element) => element.id !== id);
                    await fs.promises.writeFile(this.path, JSON.stringify(productsFilter, null, 2));
                    return productsFilter
                } else {
                    throw new Error (`El producto con el id ${id} no existe`);
                };
             } else {
                throw new Error("El archivo no existe");
             }
        } catch (error){
            // console.log(error.message);
            throw new Error(error.message);
        }
    };
}
export {ProductManager}
// const manager = new ProductManager("./products.json");

// const functionPrincipal = async()=>{
//     try{
        // const productAdded1 = await manager.addProduct("Cereal", "Cereal Infantil Nestum Frutilla - 250GR", 6000, "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20386774-qf9cW0sV-medium.png", "1012", 100});
        // const productAdded2 = await manager.addProduct("Mantequilla",  "Mantequilla con Sal - 250 GR", 1500, "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/4011088-aosxGOr0-medium.jpg", "1014", 20});
        // const productAdded3 = await manager.addProduct("Chorizo", "Chorizo Parrillero - 20 Und",  2000, "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20050239-Oy6zFS-p-medium.jpg", "1016",  30});
        // const productAdded4 = await manager.addProduct("Pizza", "Pizza de peperoni mediana", "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20211526-38YL_0zf-medium.jpg", "3333", 8800});
        // const productAdded5 = await manager.addProduct("Yogurt", "Yogurt de durazno 100Gr", 9999, "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20050239-Oy6zFS-p-medium.jpg", "44444", 888); 
        // producto imcompleto:
        // const productAdded6 = await manager.addProduct("Pasta", "pasta larga 200Gr", 1000, "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20548165-LhlJB88C-medium.jpg", 10);
        // console.log("productAdded5; ", productAdded5);
        // const product1 = await manager.getProductById(1);
        // // console.log("product1: ", product1);
        // const product2 = await manager.getProductById(3);
        // // console.log("product2: ", product2);
        // const resultado = await manager.updateProduct(3,{price:4000});
        // // console.log("resultado: ", resultado);
        // const resultado2 = await manager.getProducts();
        // // console.log("resultado2: ", resultado2);
        // const productDelete = await manager.deleteProduct(8);
        // console.log("productDelete: ", productDelete);
        
//     } catch(error){
//         console.log(error.message);
//     }
// }
// functionPrincipal();
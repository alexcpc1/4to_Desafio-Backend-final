import {__dirname} from "../../utils.js";
import {options} from "../../config/options.js";
import path from "path";

export class ProductsFiles{
    constructor(){
        this.path = path.join(__dirname,`/dao/files/${options.filesystem.products}`)
    };
    fileExist(){
        return fs.existsSync(this.path);
    }

    getNewId(products){
        let newId;
        if(!products.length){
            newId=1;
        } else {
            newId=products[products.length-1].id+1;
        }
        return newId
    }
// obtener productos
    async getProducts(){
        try {
            if(this.fileExist()){
                const contenido = await fs.promises.readFile(this.path,'utf-8');
                const contenidoJson = JSON.parse(contenido);
                return contenidoJson;
            } else {
                // console.log("El archivo no existe");
                await fs.promises.writeFile(this.path,JSON.stringify([],null,2));
                return [];
            }
        } catch (error) {
            // console.log(error.message);
            throw new Error(error.message);
        }
    };
    async getProductById(id){
        try {
            if(this.fileExist()){
                const products = await this.getProducts();
                const productFound = products.find(product=>product.id===parseInt(id));
                if(productFound){
                    return productFound;
                } else{
                    throw new Error("no se encontró el producto");
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            // console.log(error.message);
            throw new Error(error.message);
        }
    };
    async createProduct({title, description, code, price, thumbnail, status, stock, category}){
        
        if(!title || !description || !code || !price || !thumbnail ||!status || !stock || !category){
         return console.log("Todos los campos deben ser Obligatorios");
        }
        try {
            if(this.fileExist()){
                //Se obtienen los productos
                const products = await this.getProducts();
                const newId = this.getNewId(products);
                product.id = newId;
                products.push(product);
                //se reescribe el archivo
                await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                // console.log("Producto agregado");
                return product;
            } else{
                // console.log(`El archivo no existe`);
                product.id = 1;
                await fs.promises.writeFile(this.path,JSON.stringify([product],null,2));
                return product;
            }
        } catch (error) {
            // console.log(error.message);
            throw new Error(error.message);
        }
    };
    async updateProduct(id,product){
        try {
            if(this.fileExist()){
                const products = await this.getProducts();
                const productIndex = products.findIndex(product=>product.id===parseInt(id));
                if(productIndex>=0){
                    products[productIndex] = {
                        ...products[productIndex],
                        ...product
                    };
                    await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                    // console.log("producto actualizado")
                    return products[productIndex];
                } else{
                    // console.log("no se encontro el producto");
                    throw new Error(`El producto con el id ${id} no existe`);
                }
            } else {
                // console.log("El archivo no existe");
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            // console.log(error.message)
            throw new Error(error.message);
        }
    };
    async deleteProduct(id){
        try {
            if(this.fileExist()){
                const products = await this.getProducts();
                const productFound = products.find(product=>product.id===parseInt(id));
                if(productFound){
                    const newProducts = products.filter(product=>product.id!==parseInt(id));
                    await fs.promises.writeFile(this.path,JSON.stringify(newProducts,null,2));
                    return {message:"producto eliminado"};
                } else{
                    throw new Error(`El producto con el id ${id} no existe`);
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            throw new Error(error);
        }
    };
}
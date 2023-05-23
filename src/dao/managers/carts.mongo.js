import {cartsModel} from "../models/carts.model.js";

export class CartsMongo{
    constructor(){
        this.model = cartsModel;
    };

    async getCartById(id){
        try {
            const data = await this.model.findById(id);
            if(!data){
                throw new Error("el carrito no existe")
            }
            return data;
        } catch (error) {
            throw new Error(`Error al obtener carrito ${error.message}`);
        }
    };

    async createCart(cart){
        try {
            const cart = {};
            const data = await this.model.create(cart);
            return data;
        } catch (error) {
            throw new Error(`Error al crear el carrito ${error.message}`);
        }
    };

    async addProduct(cartId,productId){
        try {
            const cart = await this.getCartById(cartId);
            const productIndex = cart.products.findIndex(prod=>prod.id==productId);
            if(productIndex>=0){
                cart.products[productIndex].quantity = cart.products[productIndex].quantity+1;
            } else {
                cart.products.push({
                    id:productId,
                    quantity:1
                });
            };
            const data = await this.model.findByIdAndUpdate(cartId, cart,{new:true});
            const response = JSON.parse(JSON.stringify(data));
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async deleteProduct(cartId, productId){
        try {
            const cart = await this.getCartById(cartId);
            const productIndex = cart.products.findIndex(prod=>prod.id==productId);
            if(productIndex>=0){
                const newProducts = cart.products.filter(prod=>prod.id!=productId);
                cart.products = [...newProducts];
                const data = await this.model.findByIdAndUpdate(cartId, cart,{new:true});
                return data;
            } else {
                throw new Error(`El producto no existe en el carrito`);
            };
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    };

    async updateCart(cartId, cart){
        try {
            const data = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
            if(!data){
                throw new Error("el carrito no existe")
            }
            return data;
        } catch (error) {
            throw new Error(`Error al actualizar el carrito ${error.message}`);
        }
    };

    async addProductToCart(cartId,productId){
        try {
            const cart = await this.getCartById(cartId);
            const productIndex = cart.products.findIndex(prod=>prod.id==productId);
            if(productIndex>=0){
                cart.products[productIndex].quantity = cart.products[productIndex].quantity+1;
            } else {
                cart.products.push({
                    id:productId,
                    quantity:1
                });
            };
            const data = await this.model.findByIdAndUpdate(cartId, cart,{new:true});
            const response = JSON.parse(JSON.stringify(data));
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}
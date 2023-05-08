import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";

const productManager = new ProductManager("products.json");

const router = Router();

router.get("/",async (req,res)=>{
    const Products = await productManager.getProducts();
    res.render("realtimeproducts", {
        Products: Products
    });
});

export {router as realtimeRouter};
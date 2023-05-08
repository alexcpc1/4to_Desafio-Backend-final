import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";

const productManager = new ProductManager("products.json");

const router = Router();

router.get("/",async (req,res)=>{
    const addProducts = await productManager.getProducts();
    res.render("home", {
        Products: addProducts
    });
});

export {router as viewsRouter};
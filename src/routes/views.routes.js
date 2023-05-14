import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";

const productManager = new ProductManager("products.json");

const router = Router();

router.get("/",async (req,res)=>{
	try {
		const products = await productManager.getProducts();
		res.render("home", { products });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
});

router.get("/realtimeproducts", (req, res) => {
	try {
		res.render("realtimeproducts");
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
});

export {router as viewsRouter};
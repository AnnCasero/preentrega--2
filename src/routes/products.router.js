import express from 'express';
const router = express.Router();

import ProductManager from '../controllers/product.manager.js';
const productManager = new ProductManager('./src/models/products.json');

router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();
        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error("Error getting products", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

router.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        const product = await productManager.getProductsById(parseInt(id));
        if (!product) {
            return res.status(404).json({
                error: "Couldn't find the product"
            });
        }
        res.json(product);
    } catch (error) {
        console.error("Error getting product", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

router.post("/", async (req, res) => {
    const newProducts = req.body;
    try {
        await productManager.addProduct(newProducts);
        res.status(201).json({
            message: "Product added successfully"
        });
    } catch (error) {
        console.error("Error adding product", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const updateProducts = req.body;
    try {
        await productManager.updateProduct(parseInt(id), updateProducts);
        res.json({
            message: "Product updated successfully"
        });
    } catch (error) {
        console.error("Error updating product", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        await productManager.deleteProduct(parseInt(id));
        res.json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting product", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

export default router;
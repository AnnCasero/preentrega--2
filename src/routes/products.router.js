import express from 'express';
const router = express.Router();

import ProductManager from '../dao/db/product-manager-db.js';
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const {limit = 10, page = 1, sort, query} = req.query;

        const products = await productManager.getProducts({
            limit: parseInt(limit),
            page: parseInt(page),
            sort, 
            query,
        });
res.json({
    status: 'success',
    payload: productos,
    totalPages: productos.totalPages,
    prevPage: productos.prevPage,
    nextPage: productos.nextPage,
    page: productos.page,
    hasPrevPage: productos.hasPrevPage,
    hasNextPage: productos.hasNextPage,
    prevLink: productos.hasPrevPage ? `/api/products?limit=${limit}&page=${productos.prevPage}&sort=${sort}&query=${query}` : null,
    nextLink: productos.hasNextPage ? `/api/products?limit=${limit}&page=${productos.nextPage}&sort=${sort}&query=${query}` : null,

});
    } catch(error) {
console.error("Error getting the products", error)
res.status(500).json({
    status:'error',
    error:"Internal server error"
});
    }
});

//Traer solo 1 producto por id
router.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        const product = await productManager.getProductsById(id);
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

//agregar nuevo producto
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
//Actualizar por id
router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const updateProducts = req.body;
    try {
        await productManager.updateProduct(id, updateProducts);
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
//Eliminar producto
router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        await productManager.deleteProduct(id);
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
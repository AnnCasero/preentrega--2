import express from "express";
import CartManager from "../controllers/cart.manager.js"; // Asegúrate de importar la clase correctamente

const router = express.Router();
const cartManager = new CartManager("./src/models/carts.json"); // Usa la instancia correctamente

// Crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
    } catch (error) {
        console.error("Error creating new cart", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Obtener un carrito por ID
router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid); 

    try {
        const cart = await cartManager.getCartById(cartId);
        if (cart) {
            res.json(cart.products);
        } else {
            res.status(404).json({ error: "Cart not found" });
        }
    } catch (error) {
        console.error("Error getting cart", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Agregar un producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const updatedCart = await cartManager.addProductToCart(cartId, productId, quantity);
        if (updatedCart) {
            res.json(updatedCart.products);
        } else {
            res.status(404).json({ error: "Cart or product not found" });
        }
    } catch (error) {
        console.error("Error adding product to cart", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
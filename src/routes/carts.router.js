import express from "express";
import CartManager from "../dao/db/cart-manager-db.js"
const cartManager = new CartManager();
import cartModel from "../dao/models/cart.model.js"
const router = express.Router();

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
router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid; 
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

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
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
//Eliminar producto seleccionado
router.delete("/:cid/products/:pid", async(req, res) =>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    
    try{
        const updatedCart = await cartManager.removeProductFromCart(cartId, productId);
        if(updatedCart){
            res.json(updatedCart.products);
        } else{
            res.status(404).json({error: "Cart or product not found"});
        }
    }catch (error){
        console.error("Error removing product from cart", error);
        res.status(500).json({error: "Internal server error"});
    }
});
//Actualizar carrito con arreglo de productos
router.put("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    const products = req.body.products;

    try {
        const updatedCart = await cartManager.updateCartWithProducts(cartId, products);
        if (updatedCart) {
            res.json(updatedCart.products);
        } else {
            res.status(404).json({ error: "Cart not found" });
        }
    } catch (error) {
        console.error("Error updating cart", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Actualizar solo la cantidad de ejemplares de un producto
router.put("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    try {
        const updatedCart = await cartManager.updateProductQuantity(cartId, productId, quantity);
        if (updatedCart) {
            res.json(updatedCart.products);
        } else {
            res.status(404).json({ error: "Cart or product not found" });
        }
    } catch (error) {
        console.error("Error updating product quantity", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
import { promises as fs } from "fs";

class cartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
        this.ultId = 0;
        this.loadCart();
    }

    async loadCart() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {
                this.ultId = Math.max(...this.carts.map(cart => cart.id));
            }
        } catch (error) {
            console.error("Error loading carts from file", error);
            await this.saveCart();
        }
    }
    async saveCart() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    async createCart() {
        const newCart = {
            id: ++this.ultId,
            products: []
        };
        this.carts.push(newCart);
        await this.saveCart();
        return newCart;
    }

    async getCartById(cartId) {
        try {
            const cart = this.carts.find(c => c.id === cartId);

            if (!cart) {
                throw new Error(`No cart exists with the id ${cartId}`);
            }
            return cart;
        } catch (error) {
            console.error("Error getting cart by ID", error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        const cart = await this.getCartById(cartId);
        const existProduct = cart.product.find(p => p.product === productId);

        if (existProduct) {
            existProduct.quantity += quantity;
        } else {
            cart.product.push({ product: productId, quantity });
        }
        await this.saveCart();
        return cart;
    }

}

export default cartManager
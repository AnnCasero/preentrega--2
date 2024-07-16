import cartModel from "../fs/cart.manager.js"
class cartManager {
    async createCart() {
        try {
            const newCart = new cartModel({ products: [] });
            await newCart.saveCart();
            return newCart;
        } catch (error) {
            console.log("Error creating the cart", error);
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await cartModel.findById(cartId);
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
        try {
            const cart = await this.getCartById(cartId);
            const existProduct = cart.products.find(item => item.product.toString === productId);
            if (existProduct) {
                existProduct.quantity += quantity;
            } else {
                cart.product.push({ product: productId, quantity });
            }
            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error adding products to the cart", error);
            throw error
        }
    }
    async removeProductFromCart(cartId, productId) {
        try{
            const cart = await cartModel.findById(cartId);
            if(!cart) {
    return null;
            }
            cart.products = cart.products.filter(product => product.productId.toString() !==productId);
        await cart.save();

        return cart;
        }catch(error){
            console.error("Error removing product from cart", error);
            throw new Error("Internal server error");
        }
    }
};


export default cartManager;
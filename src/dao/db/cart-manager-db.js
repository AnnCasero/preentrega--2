// import cartModel from "../models/cart.model.js"
// class cartManager {
//     async createCart() {
//         try {
//             const newCart = new cartModel({ products: [] });
//             await newCart.save();
//             return newCart;
//         } catch (error) {
//             console.log("Error creating the cart", error);
//             throw error;
//         }
//     }
//     async getAllCarts() {
//         try {
//             const carts = await cartModel.find();
//             return carts;
//         } catch (error) {
//             console.error("Error getting the carts", error);
//             throw error;
//         }
//     }
//     async getCartById(cartId) {
//         try {
//             const cart = await cartModel.findById(cartId);
//             if (!cart) {
//                 throw new Error(`No cart exists with the id ${cartId}`);
//             }
//             return cart;
//         } catch (error) {
//             console.error("Error getting cart by ID", error);
//             throw error;
//         }
//     }

//     async addProductToCart(cartId, productId, quantity = 1) {
//         try {
//             const cart = await this.getCartById(cartId);
//             const existProduct = cart.products.find(item => item.product.toString === productId);
//             if (existProduct) {
//                 existProduct.quantity += quantity;
//             } else {
//                 cart.product.push({ product: productId, quantity });
//             }
//             cart.markModified("products");
//             await cart.save();
//             return cart;
//         } catch (error) {
//             console.error("Error adding products to the cart", error);
//             throw error
//         }
//     }
//     async removeProductFromCart(cartId, productId) {
//         try {
//             const cart = await cartModel.findById(cartId);
//             if (!cart) {
//                 return null;
//             }
//             cart.products = cart.products.filter(product => product.productId.toString() !== productId);
//             await cart.save();

//             return cart;
//         } catch (error) {
//             console.error("Error removing product from cart", error);
//             throw new Error("Internal server error");
//         }
//     }
//     async updateCartWithProducts(cartId, productId) {
//         try {
//             constcart = await cartModel.findById(cartId);
//             if (!cart) {
//                 return null;
//             }
//             cart.products = products
//             await cart.save();
//             return cart; 
//         } catch (error) {
// console.error("Error updating cart with products", error);
// throw new Error("Internal server error");
//         }
//     }
//     async updateProductQuantity(cartId, productId, quantity) {
//         try {
//             const cart = await cartModel.findById(cartId);
//             if (!cart) {
//                 return null;
//             }

//             const product = cart.products.find(product => product.productId.toString() === productId);
//             if (!product) {
//                 return null;
//             }

//             product.quantity = quantity;
//             await cart.save();

//             return cart;
//         } catch (error) {
//             console.error("Error updating product quantity", error);
//             throw new Error("Internal server error");
//         }
//     }
//     async clearCart(cartId) {
//         try {
//             const cart = await cartModel.findById(cartId);
//             if (!cart) {
//                 return null;
//             }

//             cart.products = [];
//             await cart.save();

//             return cart;
//         } catch (error) {
//             console.error("Error clearing cart", error);
//             throw new Error("Internal server error");
//         }
//     }
//     async getCartWithProducts(cartId) {
//         try {
//             const cart = await cartModel.findById(cartId).populate('products.productId');
//             return cart;
//         } catch (error) {
//             console.error("Error getting cart with products", error);
//             throw new Error("Internal server error");
//         }
//     }
// };


// export default cartManager;


//  INTENTO 2

// import cartModel from "../models/cart.model.js";

// class CartManager {
//     async createCart() {
//         try {
//             const newCart = new cartModel({ products: [] });
//             await newCart.save();
//             return newCart;
//         } catch (error) {
//             console.log("Error creating the cart", error);
//             throw error;
//         }
//     }

//     async getAllCarts() {
//         try {
//             const carts = await cartModel.find();
//             return carts;
//         } catch (error) {
//             console.error("Error getting the carts", error);
//             throw error;
//         }
//     }

//     async getCartById(cartId) {
//         try {
//             const cart = await cartModel.findById(cartId).populate('products.product');
//             if (!cart) {
//                 throw new Error(`No cart exists with the id ${cartId}`);
//             }
//             return cart;
//         } catch (error) {
//             console.error("Error getting cart by ID", error);
//             throw error;
//         }
//     }

//     async addProductToCart(cartId, productId, quantity = 1) {
//         try {
//             const cart = await this.getCartById(cartId);
//             const existProduct = cart.products.find(item => item.product.toString() === productId);
//             if (existProduct) {
//                 existProduct.quantity += quantity;
//             } else {
//                 cart.products.push({ product: productId, quantity });
//             }
//             cart.markModified("products");
//             await cart.save();
//             return cart;
//         } catch (error) {
//             console.error("Error adding products to the cart", error);
//             throw error;
//         }
//     }

//     async removeProductFromCart(cartId, productId) {
//         try {
//             const cart = await cartModel.findById(cartId);
//             if (!cart) {
//                 return null;
//             }
//             cart.products = cart.products.filter(product => product.product.toString() !== productId);
//             await cart.save();
//             return cart;
//         } catch (error) {
//             console.error("Error removing product from cart", error);
//             throw new Error("Internal server error");
//         }
//     }

//     async updateCartWithProducts(cartId, products) {
//         try {
//             const cart = await cartModel.findById(cartId);
//             if (!cart) {
//                 return null;
//             }
//             cart.products = products;
//             await cart.save();
//             return cart;
//         } catch (error) {
//             console.error("Error updating cart with products", error);
//             throw new Error("Internal server error");
//         }
//     }

//     async updateProductQuantity(cartId, productId, quantity) {
//         try {
//             const cart = await cartModel.findById(cartId);
//             if (!cart) {
//                 return null;
//             }

//             const product = cart.products.find(product => product.product.toString() === productId);
//             if (!product) {
//                 return null;
//             }

//             product.quantity = quantity;
//             await cart.save();
//             return cart;
//         } catch (error) {
//             console.error("Error updating product quantity", error);
//             throw new Error("Internal server error");
//         }
//     }

//     async clearCart(cartId) {
//         try {
//             const cart = await cartModel.findById(cartId);
//             if (!cart) {
//                 return null;
//             }

//             cart.products = [];
//             await cart.save();
//             return cart;
//         } catch (error) {
//             console.error("Error clearing cart", error);
//             throw new Error("Internal server error");
//         }
//     }

//     async getCartWithProducts(cartId) {
//         try {
//             const cart = await cartModel.findById(cartId).populate('products.product');
//             return cart;
//         } catch (error) {
//             console.error("Error getting cart with products", error);
//             throw new Error("Internal server error");
//         }
//     }
// }

// export default CartManager;





import cartModel from "../models/cart.model.js";

class CartManager {
    async createCart() {
        try {
            const newCart = new cartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log("Error creating the cart", error);
            throw error;
        }
    }

    async getAllCarts() {
        try {
            const carts = await cartModel.find();
            return carts;
        } catch (error) {
            console.error("Error getting the carts", error);
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await cartModel.findById(cartId).populate('products.product');
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
            const existProduct = cart.products.find(item => item.product._id.toString() === productId);
            if (existProduct) {
                existProduct.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error adding products to the cart", error);
            throw error;
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                return null;
            }
            cart.products = cart.products.filter(product => product.product._id.toString() !== productId);
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error removing product from cart", error);
            throw new Error("Internal server error");
        }
    }

    async updateCartWithProducts(cartId, products) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                return null;
            }
            cart.products = products;
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error updating cart with products", error);
            throw new Error("Internal server error");
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                return null;
            }

            const product = cart.products.find(product => product.product._id.toString() === productId);
            if (!product) {
                return null;
            }

            product.quantity = quantity;
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error updating product quantity", error);
            throw new Error("Internal server error");
        }
    }

    async clearCart(cartId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                return null;
            }

            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error clearing cart", error);
            throw new Error("Internal server error");
        }
    }

    async getCartWithProducts(cartId) {
        try {
            const cart = await cartModel.findById(cartId).populate('products.product');
            return cart;
        } catch (error) {
            console.error("Error getting cart with products", error);
            throw new Error("Internal server error");
        }
    }
}

export default CartManager;

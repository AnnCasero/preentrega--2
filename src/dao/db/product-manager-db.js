import productModel from "../models/product.model.js";

class ProductManager {

    async addProduct(products) {
        try {
            products.forEach(async element => {
                let title = element.title
                let description = element.description
                let price = element.price
                let code = element.code
                let stock = element.stock
                let thumbnails = element.thumbnails
                let status = element.status
                if (!title || !description || !price || !code || !stock) {
                    console.log("All the fields are mandatory");
                    return;
                }
                const productoExistente = await productModel.findOne({ code: code });
                if (productoExistente) {
                    console.log("The code must be unique");
                    return;
                }
                // Creamos el nuevo producto:
                const newProduct = new productModel({
                    title,
                    description,
                    price,
                    code,
                    stock,
                    status: true,
                    thumbnails: thumbnails || []
                });
                arrayProducts.push(newProduct);
            });

            await newProduct.save();
        } catch (error) {
            console.log("Error saving the file");
            throw error;
        }
    }

    async getProducts() {
        try {
            const arrayProducts = await productModel.find();
            return arrayProducts;
        } catch (error) {
            console.log("Error getting the files", error);
            throw error;
        }
    }



    async getProductsById(id) {
        try {
            const searching = await productModel.findById(id);
            if (!searching) {
                console.log("Couldn't find the product");
                return null;
            } else {
                console.log("Product found");
                return searching;
            }
        } catch (error) {
            console.log("Error finding the file", error);
            throw error;
        }
    }

    async updateProduct(id, productUpdated) {
        try {
            const producto = await productModel.findByIdAndUpdate(id, productUpdated)
            if (!producto) {
                console.log("Couldn't find product");
                return producto;
            }
            else {
                console.log("Product updated!")
            }
        } catch (error) {
            console.log("Error Updating Product", error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const deleted = await productModel.findByIdAndDelete(id);
            if (!deleted) {
                console.log("Couldn't delete the product");
                return null;
            } else {
                console.log("Product deleted!");
                return deleted;
            }
        } catch (error) {
            console.error("Error finding the product", error);
            throw error;
        }
    }
}

export default ProductManager;
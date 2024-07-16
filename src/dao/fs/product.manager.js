import { promises as fs } from 'fs';

class ProductManager {
    static ultId = 0;
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(products) {
        try {
            const arrayProducts = await this.readFile();
            products.forEach(element => {
                let title = element.title
                let description = element.description
                let price = element.price
                let code = element.code
                let stock = element.stock
                let thumbnails = element.thumbnails
                let status = element.status
                if (!title || !description || !price || !code || !stock) {
                    console.log("Todos los campos son obligatorios");
                    return;
                }
                if (arrayProducts.some(item => item.code === code)) {
                    console.log("El codigo debe ser unico");
                    return;
                }
                // Creamos el nuevo producto:
                const newProduct = {
                    id: ++ProductManager.ultId,
                    title,
                    description,
                    price,
                    code,
                    stock,
                    status: true,
                    thumbnails: thumbnails || []
                };
                console.log("voy a generar el producto nuevo")
                console.log(newProduct)
                if (arrayProducts.length > 0) {
                    ProductManager.ultId = arrayProducts.reduce((maxId, product) => Math.max(maxId, product.id), 0);
                }
                newProduct.id = ++ProductManager.ultId;
                arrayProducts.push(newProduct);
            });
            console.log("va el array products")
            console.log(arrayProducts)
            await this.saveFile(arrayProducts); 
        } catch (error) {
            console.log("Error saving the file");
            throw error;
        }
    }



    async getProductsById(id) {
        try {
            const arrayProducts = await this.readFile();
            const searching = arrayProducts.find(item => item.id === id);

            if (!searching) {
                console.log("Couldn't find the product");
                return null;
            } else {
                console.log("Product found");
                return searching;
            }
        } catch (error) {
            console.log("Error reading the file", error);
            throw error;
        }
    }

    async readFile() {
        try {
            const response = await fs.readFile(this.path, "utf-8");
            const arrayProducts = JSON.parse(response);
            return arrayProducts;
        } catch (error) {
            console.log("Error reading the file", error);
            throw error;
        }
    }

    async saveFile(arrayProducts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
        } catch (error) {
            console.error("Error saving the file", error);
            throw error;
        }
    }

    async updateProduct(id, productUpdated) {
        try {
            const arrayProducts = await this.readFile();
            const index = arrayProducts.findIndex(item => item.id === id);
            if (index !== -1) {
                arrayProducts[index] = { ...arrayProducts[index], ...productUpdated };
                await this.saveFile(arrayProducts);
                console.log("product updated successfully");
            } else {
                console.log("Couldn't find the product");
            }
        } catch (error) {
            console.log("Error Updating Product", error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const arrayProducts = await this.readFile();
            const index = arrayProducts.findIndex(item => item.id === id);
            if (index !== -1) {
                arrayProducts.splice(index, 1);
                await this.saveFile(arrayProducts);
                console.log("Product deleted");
            } else {
                console.log("Couldn't find the product");
            }
        } catch (error) {
            console.error("Error finding the product", error);
            throw error;
        }
    }
}

export default ProductManager;
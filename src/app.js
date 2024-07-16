import express from "express";
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./dao/fs/product.manager.js";
import "./database.js"

const app = express();
const PORT = 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const productManager = new ProductManager("./src/models/products.json");
const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Un cliente se ha conectado");

    socket.emit("products", await productManager.getProducts());

    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id);
        io.emit("products", await productManager.getProducts()); // Emitir a todos los clientes conectados
    });

    socket.on("addProduct", async (product) => {
        await productManager.addProduct(product);
        io.emit("products", await productManager.getProducts()); // Emitir a todos los clientes conectados
    });
});
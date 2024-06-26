// import express from "express";
// import { engine } from 'express-handlebars';
// import { Server } from 'socket.io';
// import productsRouter from "./routes/products.router.js";
// import cartsRouter from "./routes/carts.router.js";
// import viewsRouter from "./routes/views.router.js";

// const app = express();
// const PUERTO = 8080;

// Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("./src/public"));

// app.engine("handlebars", engine());
// app.set("view engine", "handlebars");
// app.set("views", "./src/views");

// Rutas
// app.use("/api/products", productsRouter);
// app.use("/api/carts", cartsRouter);
// app.use("/", viewsRouter);

// const httpServer = app.listen(PUERTO, () => {
//     console.log(`Servidor escuchando en el puerto ${PUERTO}`);
// });

// import ProductManager from "./controllers/product.manager.js";

// const productManager = new ProductManager("./src/models/products.json");

// const io = new Server(httpServer);

// io.on("connection", async (socket) => { // Corregido "conecction" a "connection" y añadido "socket"
//     console.log("Un cliente se ha conectado");

//     socket.emit("products", await productManager.getProducts());

//     socket.on("deleteProduct", async (id) => {
//         await productManager.deleteProduct(id);

//         io.sockets.emit("products", await productManager.getProducts()); // Corregido "io.socket.emit" a "io.emit"
//     });

//     socket.on("addProduct", async (product) =>{
//         await productManager.addProduct(product);

//         io.sockets.emit("product", await productManager.getProducts());
//     })
// });


import express from "express";
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./controllers/product.manager.js";

const app = express();
const PORT = 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
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
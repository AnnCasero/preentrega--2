import mongoose from "mongoose";

mongoose.connect("mongodb+srv://anabelcasero19:coderhouse@cluster0.xpxmn4w.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
.then( () => console.log("Conexion exitosa"))
.catch((error)=> console.log("Ha ocurrido un error", error)) 
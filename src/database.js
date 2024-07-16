import mongoose from "mongoose";

mongoose.connect("mongodb+srv://anabelcasero19:papitas12345@cluster0.xpxmn4w.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
.then( () => console.log("Coneccion exitosa"))
.catch((error)=> console.log("Ha ocurrido un error", error)) 
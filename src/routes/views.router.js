import { Router } from "express";
const router = Router(); 

router.get("/", async (req, res) => {
    res.render("realtimeproducts");
})

router.get("/productos", async (req, res) => {
    res.render("home", {});
})

export default router;
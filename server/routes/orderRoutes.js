import express from "express";
import { checkout } from "../controllers/orderController.js";
import { ordersHistory } from "../controllers/orderController.js";

const router = express.Router();

router.get("/", ordersHistory);
router.post("/", checkout);

export default router;
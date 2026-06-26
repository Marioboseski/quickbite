import express from "express";
import { checkout } from "../controllers/orderController.js";
import { ordersHistory } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, ordersHistory);
router.post("/", checkout);

export default router;
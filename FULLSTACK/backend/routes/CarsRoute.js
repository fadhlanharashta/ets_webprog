import express from "express";
import {
    getCars,
    getCarsById,
    createCars,
    updateCars,
    deleteCars
} from "../controllers/Cars.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/cars', verifyUser, getCars);
router.get('/cars/:id', verifyUser, getCarsById);
router.post ('/cars', verifyUser, createCars);
router.patch('/cars/:id', verifyUser, updateCars);
router.delete('/cars/:id', verifyUser, deleteCars);

export default router;
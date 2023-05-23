import express, { Router, Request, Response } from "express";
import { authenticate } from "../auth/auth";
import categoryService from "../service/category.service";
import logger from "../utils/logger";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const data = await categoryService.getAllCategories();

        return res.status(200).json(data);
    } catch (e) {
        logger.info(e, "Error in fetching data");
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
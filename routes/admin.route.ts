import express, { Router, Request, Response } from "express";
import { matchedData } from "express-validator";
import { ObjectId } from "mongodb";

import { authenticate } from "../auth/auth";
import adminService from "../service/admin.service";

import validateRequest from "../utils/validator";
import logger from "../utils/logger";

const router: Router = express.Router();

router.get("/albumfeeds", authenticate, async (req: Request, res: Response) => {
    try {
        const data = await adminService.getAllAlbums();

        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).send("Error in fetching data")
    }
});

router.get("/arts", authenticate, async (req: Request, res: Response) => {
    try {
        const data = await adminService.getAllArts();

        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).send("Error in fetching data")
    }
});

router.get("/articles", authenticate, async (req: Request, res: Response) => {
    try {
        const data = await adminService.getAllArticles();

        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).send("Error in fetching data")
    }
});

router.get("/photos", authenticate, async (req: Request, res: Response) => {
    try {
        const data = await adminService.getAllPhotos();

        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).send("Error in fetching data")
    }
});

export default router;


import express, { Router, Request, Response } from "express";
import { matchedData } from "express-validator";
import { ObjectId } from "mongodb";

import photoService from "../service/photo.service";
import basicPagingValidationSchema from "../utils/validations/requestParamValidationSchema";
import photoValidation from "../utils/validations/photoValidation";

import { authenticate } from "../auth/auth";
import Photo from "../model/photo.model";
import logger from "../utils/logger";
import validateRequest from "../utils/validator";

const router: Router = express.Router();


router.get("/", basicPagingValidationSchema, validateRequest, async (req: Request, res: Response) => {
    const { page, size, sortField, sortOrder, filterBy } = matchedData(req);

    try {
        const data = await photoService.getAllPhotos(parseInt(page), parseInt(size), sortField, sortOrder, filterBy);

        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).send("Error in fetching data")
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = req.params['id'];
    logger.info(id);

    try {
        const data = await photoService.getPhotoById(new ObjectId(id));
        logger.info(data);

        if (data == null)
            return res.status(404).json({ message: "No data found" })

        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).send("Error in fetching data")
    }
});

router.post("/", authenticate, photoValidation, validateRequest, async (req: Request, res: Response) => {
    const data = matchedData(req);
    const user: any = req.body.user;

    logger.info({ data, user });

    try {
        const insertedId = await photoService.addPhoto(data);

        return res.status(201).json({ message: "data created successfully", id: insertedId });
    } catch (e) {
        res.status(500).send("Internal server error");
    }

})

router.put("/", authenticate, photoValidation, validateRequest, async (req: Request, res: Response) => {
    const data = matchedData(req);
    logger.info(data);

    try {
        const insertedId = await photoService.updatePhoto(data as Photo);

        return res.status(201).json({ message: "data created successfully", id: insertedId });
    } catch (e) {
        res.status(500).send("Internal server error");
    }
})

router.delete("/:id", authenticate, async (req: Request, res: Response) => {
    const id = req.params['id'];
    logger.info(id);

    try {
        const deleted = await photoService.deletePhotoById(new ObjectId(id));

        if (!deleted)
            return res.status(500).json({ message: "Error in deleting the data", id: id });
        else
            return res.status(200).json({ message: "data deleted successfully", id: id })
    } catch (e) {
        res.status(500).send("Internal server error");
    }

})

export default router;


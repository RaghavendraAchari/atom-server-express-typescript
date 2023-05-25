import express, { Router, Request, Response } from "express";
import { matchedData } from "express-validator";
import { ObjectId } from "mongodb";

import { authenticate } from "../auth/auth";
import basicPagingValidationSchema from "../utils/validations/requestParamValidationSchema";
import artValidation from "../utils/validations/artRequestModelValidation";

import artService from "../service/art.service";
import validateRequest from "../utils/validator";
import logger from "../utils/logger";

const router: Router = express.Router();

router.get("/", basicPagingValidationSchema, validateRequest, async (req: Request, res: Response) => {
    const { page, size, sortField, sortOrder, filterBy } = matchedData(req);

    try {
        const data = await artService.getAllArts(parseInt(page), parseInt(size), sortField, sortOrder, filterBy);

        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).send("Error in fetching data")
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = req.params['id'];
    logger.info(id, "Received data");

    try {
        const data = await artService.getArtById(new ObjectId(id));
        console.log(data);

        if (data == null)
            return res.status(404).json({ message: "No data found" });

        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).send("Error in fetching data");
    }
});

router.post("/", authenticate, artValidation, validateRequest, async (req: Request, res: Response) => {
    const data = matchedData(req);
    const user: any = req.body.user;

    logger.info({ data, user }, "Received data");

    try {
        const insertedId = await artService.addArt(data);

        return res.status(201).json({ message: "data created successfully", id: insertedId });
    } catch (e) {
        res.status(500).send("Internal server error");
    }

})

router.put("/", authenticate, artValidation, validateRequest, async (req: Request, res: Response) => {
    const data = matchedData(req);
    console.log(data);

    try {
        const insertedId = await artService.addArt(data);

        return res.status(201).json({ message: "data created successfully", id: insertedId });
    } catch (e) {
        res.status(500).send("Internal server error");
    }
})

router.delete("/:id", authenticate, async (req: Request, res: Response) => {
    const id = req.params['id'];
    console.log(id);

    try {
        const deleted = await artService.deleteArtById(new ObjectId(id));
        if (!deleted)
            return res.status(500).json({
                message: "Error in deleting the data",
                id: id
            });
        else
            return res.status(200).json({
                message: "data deleted successfully",
                id: id
            })
    } catch (e) {
        res.status(500).send("Internal server error");
    }
})

export default router;

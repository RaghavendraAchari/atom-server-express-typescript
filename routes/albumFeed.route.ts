import express, { Router, Request, Response } from "express";
import albumFeedService, { getAllAlbumFeed } from "../service/albumFeed.service";
import basicPagingValidationSchema from "../utils/validations/requestParamValidationSchema";
import albumFeedValidation, { albumFeedUpdateDataValidation } from "../utils/validations/validations";
import validateRequest from "../utils/validator";
import { matchedData } from "express-validator";
import { authenticate } from "../auth/auth";
import { AlbumFeedResponseObject } from "../model/albumFeed.model";
import AlbumUpdateRequest from "../requestDataModels/AlbumUpdateRequest";
import { ObjectId } from "mongodb";

const router: Router = express.Router();

router.get("/", basicPagingValidationSchema, validateRequest, async (req: Request, res: Response) => {
    const { page, size, sortField, sortOrder, category } = matchedData(req);

    try {
        const data = await getAllAlbumFeed(parseInt(page), parseInt(size), sortField, sortOrder, category);
        return res.status(200).json(data);
    } 
    catch(e) {
        console.log(e);
        return res.status(500).send("Error in fetching the data. Internal server error.")
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = req.params['id'];
    console.log(id);

    try {
        const data = await albumFeedService.getAlbumFeedById(id);
        console.log(data);

        if (data == null) {
            return res.status(404).json({ message: "No data found" })
        }

        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).send("Error in fetching data")
    }
});

router.post("/", authenticate, albumFeedValidation, validateRequest, async (req: Request, res: Response) => {
    const data = matchedData(req) as AlbumFeedResponseObject;

    try {
        const insertedId = await albumFeedService.addAlbumFeed(data);
        return res.status(200).json({ insertedId });
    } catch (e) {
        console.log(e);

        return res.status(500).send("Error in fetching the data. Internal server error.")
    }
});

router.put("/:id", authenticate, albumFeedUpdateDataValidation, validateRequest, async (req: Request, res: Response) => {
    const data = matchedData(req) as AlbumUpdateRequest;
    data._id = new ObjectId(data._id);

    try {
        const updatedData = await albumFeedService.updateAlbumFeed(data);
        return res.status(200).send(updatedData);
    } catch (e) {
        console.log(e);

        return res.status(500).send("Error in fetching the data. Internal server error.")
    }
});

router.delete("/:id", authenticate, async (req: Request, res: Response) => {
    const id = req.params['id'];
    console.log(id);

    try {
        const data = await albumFeedService.getAlbumFeedById(id);
        console.log(data);

        if (data == null) {
            return res.status(404).json({ message: "No data found" })
        }

        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).send("Error in fetching data")
    }
});


export default router;

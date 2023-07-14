import express, { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";

import { matchedData, query } from "express-validator";
import validateRequest from "../utils/validator";
import logger from "../utils/logger";

import { authenticate } from "../auth/auth";

import ErrorResponse from "../responseDataModels/Error";
import articleService from "../service/article.service";
import Article, { newArticleValidation, updateArticleValidation } from "../model/article.model";
import { ArticleRequestData, ArticleResponseData, UpdateArticleRequestData } from "../reqResDataModels/article.dto";

const articleRouter: Router = express.Router();

const basicPagingValidationSchema = [
    query('page').notEmpty().isInt({ min: 1 }),
    query('size').notEmpty().isInt({ min: 1 }),
    query('sortField').default("date"),
    query('sortOrder').default("asc").isIn(["asc", "desc"]),
    query('filterBy').default(null),
]

articleRouter.get("/",basicPagingValidationSchema, validateRequest, async (req: Request, res: Response) => {
    const { page, size, sortField, sortOrder, filterBy } = matchedData(req);

    try {
        const data = await articleService.getAllArticles(parseInt(page), parseInt(size), sortField, sortOrder, filterBy);

        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).send("Error in fetching data")
    }
});

articleRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params['id'];
    logger.info(id, "Received data");

    try {
        const data = await articleService.getArticleById(id);
        console.log(data);

        if (data == null)
            return res.status(404).json(new ErrorResponse("No data found"));

        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).send(new ErrorResponse("Error in fetching data"));
    }
});

articleRouter.post("/", authenticate, newArticleValidation, validateRequest, async (req: Request, res: Response) => {
    const data = matchedData(req);
    const user: any = req.body.user;

    logger.info({ data, user }, "Received data");

    try {
        const insertedId = await articleService.addArticle(data as ArticleRequestData);

        return res.status(201).json({ message: "data created successfully", id: insertedId });
    } catch (e) {
        res.status(500).send(new ErrorResponse("Internal server error"));
    }

})

articleRouter.put("/:id", authenticate, updateArticleValidation, validateRequest, async (req: Request, res: Response) => {
    const data = matchedData(req) as UpdateArticleRequestData;
    data._id = new ObjectId(req.params['id']);
    console.log(typeof(data._id));

    try {
        const updatedDocument = await articleService.updateArticle(data as UpdateArticleRequestData);

        if(updatedDocument !== null)
            return res.status(201).json({ message: "data created successfully", updatedDocument: updatedDocument });
        
        return res.status(404).json({message: "No matching data found to update"});

    } catch (e) {
        res.status(500).send(new ErrorResponse("Internal server error"));
    }
})

articleRouter.delete("/:id", authenticate, async (req: Request, res: Response) => {
    const id = req.params['id'];
    console.log(id);

    try {
        const deleted: ArticleRequestData | null = await articleService.deleteArticleById(new ObjectId(id));
        if (!deleted)
            return res.status(404).json({
                message: "No data found with the ID",
            });
        else
            return res.status(200).json({
                message: "data deleted successfully",
                value: deleted
            })
    } catch (e) {
        return res.status(500).send(new ErrorResponse("Internal server error"));
    }
})

articleRouter.post("/publish/:id", authenticate, async (req: Request, res: Response) => {
    const id = req.params['id'];
    console.log(id);

    try {
        const deleted = await articleService.publishArticle(id);
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
        return res.status(500).send(new ErrorResponse("Internal server error"));
    }
})

export default articleRouter;


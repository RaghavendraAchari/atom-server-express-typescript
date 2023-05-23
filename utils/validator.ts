import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default function validateRequest(req: Request, res: Response, next: NextFunction) {
    const err = validationResult(req);

    if (!err.isEmpty()) {
        return res.status(400).send(err.array());
    }
    else {
        next();
    }
}
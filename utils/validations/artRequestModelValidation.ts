import { body } from "express-validator"

const artValidation = [
    body('title').notEmpty(),
    body('thumbnailLink').notEmpty().isURL(),
    body('originalFileLink').notEmpty().isURL(),
    body('description').notEmpty(),
    body('date').notEmpty(),
]

export default artValidation;
import { body } from "express-validator"

const photoValidation = [
    body('thumbnailLink').notEmpty().isURL(),
    body('originalFileLink').notEmpty().isURL(),
    body('date').notEmpty(),
]

export default photoValidation;
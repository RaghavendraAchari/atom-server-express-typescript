import { body } from "express-validator"

const artValidation = [
    body('_id').optional().isMongoId(),
    body('title').notEmpty(),
    body('thumbnailLink').notEmpty().isURL({protocols:['http', 'https']}),
    body('originalFileLink').notEmpty().isURL({protocols:['http', 'https']}),
    body('midResUrl').notEmpty().isURL({protocols:['http', 'https']}),
    body('description').notEmpty(),
    body('date').notEmpty(),
    body('publishable').isBoolean().default(false)
]

export default artValidation;
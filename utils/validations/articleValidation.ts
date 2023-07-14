import { body } from "express-validator"

const articleValidation = [
    body('_id').optional().isMongoId(),
    body('title').notEmpty(),
    body('').notEmpty().isURL({protocols:['http', 'https']}),
    body('').notEmpty().isURL({protocols:['http', 'https']}),
    body('').notEmpty().isURL({protocols:['http', 'https']}),
    body('').notEmpty(),
    body('date').notEmpty(),
    body('publishable').isBoolean().default(false)
]

export default articleValidation;
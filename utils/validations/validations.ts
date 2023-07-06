import { body, check } from "express-validator"

const albumFeedValidation = [
    body('title', "must not be empty").notEmpty(),
    body('description').notEmpty(),
    body('category').isArray({ min: 1 }),
    body('category.*').isString(),
    body('details').notEmpty(),
    body('photos').notEmpty().isArray({ min: 1 }),
    body('photos.*.date').notEmpty().isISO8601().toDate(),
    body('photos.*.thumbnailUrl').notEmpty().isURL({ protocols: ['http', 'https'] }),
    body('photos.*.originalFileUrl').notEmpty().isURL({ protocols: ['http', 'https'] }),
]

export const albumFeedUpdateDataValidation = [
    body("_id").notEmpty(),
    body('title', "must not be empty").notEmpty(),
    body('description').notEmpty(),
    body('category').isArray({ min: 1 }),
    body('category.*').isString(),
    body('details').notEmpty(),
    body('date').notEmpty()
]

export default albumFeedValidation;
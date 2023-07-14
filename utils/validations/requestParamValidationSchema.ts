import { query } from "express-validator"

const basicPagingValidationSchema = [
    query('page').notEmpty().isInt({ min: 1 }),
    query('size').notEmpty().isInt({ min: 1 }),
    query('sortField').default("date"),
    query('sortOrder').default("asc").isIn(["asc", "desc"]),
    query('filterBy').default(null),
    query('category').default("all")
]



export default basicPagingValidationSchema;
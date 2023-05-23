"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const basicPagingValidationSchema = [
    (0, express_validator_1.query)('page').notEmpty().isNumeric().isLength({ min: 1 }),
    (0, express_validator_1.query)('size').notEmpty().isNumeric().isLength({ min: 1 }),
    (0, express_validator_1.query)('sortField').default("date"),
    (0, express_validator_1.query)('sortOrder').default("asc").isIn(["asc", "desc"]),
    (0, express_validator_1.query)('filterBy').default(null)
];
exports.default = basicPagingValidationSchema;

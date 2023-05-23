"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const photoValidation = [
    (0, express_validator_1.body)('thumbnailLink').notEmpty().isURL(),
    (0, express_validator_1.body)('originalFileLink').notEmpty().isURL(),
    (0, express_validator_1.body)('date').notEmpty(),
];
exports.default = photoValidation;

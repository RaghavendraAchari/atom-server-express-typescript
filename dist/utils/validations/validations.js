"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const albumFeedValidation = [
    (0, express_validator_1.body)('title', "must not be empty").notEmpty(),
    (0, express_validator_1.body)('description').notEmpty(),
    (0, express_validator_1.body)('category').isArray({ min: 1 }),
    (0, express_validator_1.body)('category.*').isString(),
    (0, express_validator_1.body)('details').notEmpty(),
    (0, express_validator_1.body)('photos').notEmpty().isArray({ min: 1 }),
    (0, express_validator_1.body)('photos.*.date').notEmpty().isISO8601().toDate(),
    (0, express_validator_1.body)('photos.*.thumbnailUrl').notEmpty().isURL({ protocols: ['http', 'https'] }),
    (0, express_validator_1.body)('photos.*.originalFileUrl').notEmpty().isURL({ protocols: ['http', 'https'] }),
];
exports.default = albumFeedValidation;

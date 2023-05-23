"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
function validateRequest(req, res, next) {
    const err = (0, express_validator_1.validationResult)(req);
    if (!err.isEmpty()) {
        return res.status(400).send(err.array());
    }
    else {
        next();
    }
}
exports.default = validateRequest;

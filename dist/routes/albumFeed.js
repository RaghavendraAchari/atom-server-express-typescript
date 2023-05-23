"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const albumFeed_service_1 = require("../service/albumFeed.service");
const express_validator_1 = require("express-validator");
const schema_1 = require("express-validator/src/middlewares/schema");
const matched_data_1 = require("express-validator/src/matched-data");
const requestParamValidationSchema_1 = __importDefault(require("../utils/requestParamValidationSchema"));
const router = express_1.default.Router();
router
    .get("/", (0, schema_1.checkSchema)(requestParamValidationSchema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    const { page, size, sortField, sortOrder } = (0, matched_data_1.matchedData)(req);
    try {
        const data = yield (0, albumFeed_service_1.getAllAlbumFeed)();
        return res.status(200).json(data);
    }
    catch (e) {
        return res.status(500).send("Error in fetching the data. Internal server error.");
    }
}));
exports.default = router;

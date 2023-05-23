"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const albumFeed_service_1 = __importStar(require("../service/albumFeed.service"));
const express_validator_1 = require("express-validator");
const requestParamValidationSchema_1 = __importDefault(require("../utils/validations/requestParamValidationSchema"));
const auth_1 = require("../auth/auth");
const validations_1 = __importDefault(require("../utils/validations/validations"));
const validator_1 = __importDefault(require("../utils/validator"));
const router = express_1.default.Router();
router.get("/", requestParamValidationSchema_1.default, validator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, sortField, sortOrder, category } = (0, express_validator_1.matchedData)(req);
    try {
        const data = yield (0, albumFeed_service_1.getAllAlbumFeed)(parseInt(page), parseInt(size), sortField, sortOrder, category);
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).send("Error in fetching the data. Internal server error.");
    }
}));
router.post("/", auth_1.authenticate, validations_1.default, validator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (0, express_validator_1.matchedData)(req);
    try {
        const insertedId = yield albumFeed_service_1.default.addAlbumFeed(data);
        return res.status(200).json({ insertedId });
    }
    catch (e) {
        console.log(e);
        return res.status(500).send("Error in fetching the data. Internal server error.");
    }
}));
exports.default = router;

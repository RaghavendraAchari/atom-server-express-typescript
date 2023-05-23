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
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const auth_1 = require("../auth/auth");
const requestParamValidationSchema_1 = __importDefault(require("../utils/validations/requestParamValidationSchema"));
const artRequestModelValidation_1 = __importDefault(require("../utils/validations/artRequestModelValidation"));
const art_service_1 = __importDefault(require("../service/art.service"));
const validator_1 = __importDefault(require("../utils/validator"));
const router = express_1.default.Router();
router.get("/", requestParamValidationSchema_1.default, validator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, sortField, sortOrder, filterBy } = (0, express_validator_1.matchedData)(req);
    try {
        const data = yield art_service_1.default.getAllArts(parseInt(page), parseInt(size), sortField, sortOrder, filterBy);
        return res.status(200).json(data);
    }
    catch (e) {
        return res.status(500).send("Error in fetching data");
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    console.log(id);
    try {
        const data = yield art_service_1.default.getArtById(new mongodb_1.ObjectId(id));
        console.log(data);
        if (data == null) {
            return res.status(404).json({ message: "No data found" });
        }
        return res.status(200).json(data);
    }
    catch (e) {
        return res.status(500).send("Error in fetching data");
    }
}));
router.post("/", auth_1.authenticate, artRequestModelValidation_1.default, validator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (0, express_validator_1.matchedData)(req);
    const user = req.body.user;
    console.log({ data, user });
    try {
        const insertedId = yield art_service_1.default.addArt(data);
        return res.status(201).json({ message: "data created successfully", id: insertedId });
    }
    catch (e) {
        res.status(500).send("Internal server error");
    }
}));
router.put("/", auth_1.authenticate, artRequestModelValidation_1.default, validator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (0, express_validator_1.matchedData)(req);
    console.log(data);
    try {
        const insertedId = yield art_service_1.default.addArt(data);
        return res.status(201).json({ message: "data created successfully", id: insertedId });
    }
    catch (e) {
        res.status(500).send("Internal server error");
    }
}));
router.delete("/:id", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    console.log(id);
    try {
        const deleted = yield art_service_1.default.deleteArtById(new mongodb_1.ObjectId(id));
        if (!deleted)
            return res.status(500).json({
                message: "Error in deleting the data",
                id: id
            });
        else
            return res.status(200).json({
                message: "data deleted successfully",
                id: id
            });
    }
    catch (e) {
        res.status(500).send("Internal server error");
    }
}));
exports.default = router;

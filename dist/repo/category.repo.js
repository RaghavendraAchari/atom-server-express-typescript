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
const connection_1 = require("../DB/connection");
const logger_1 = __importDefault(require("../utils/logger"));
const collectionName = "Categories";
function getAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        const data = yield db.collection(collectionName).find().toArray();
        logger_1.default.info(data, "Fetched Categories");
        return data;
    });
}
exports.default = {
    getAllCategories
};

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
exports.addArt = exports.getAllArts = void 0;
const art_repo_1 = __importDefault(require("../repo/art.repo"));
const art_repo_2 = __importDefault(require("../repo/art.repo"));
function getAllArts(pageSize, size, sortBy, sortDirection, filterBy) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield art_repo_1.default.getAllArt(pageSize - 1, size, sortBy, sortDirection, filterBy);
        return {
            arts: data.arts,
            totalCount: data.totalCount,
            totalPages: Math.ceil(data.totalCount / size),
            currentPage: pageSize
        };
    });
}
exports.getAllArts = getAllArts;
function addArt(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const art = {
            _id: null,
            title: data.title,
            description: data.description,
            thumbnailUrl: data.thumbnailUrl,
            originalFileUrl: data.originalFileUrl,
            date: data.date,
        };
        console.log(art);
        return yield art_repo_1.default.addArt(art);
    });
}
exports.addArt = addArt;
function getArtById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield art_repo_2.default.findById(id);
    });
}
function deleteArtById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield art_repo_2.default.deleteById(id);
    });
}
exports.default = {
    getAllArts,
    addArt,
    getArtById,
    deleteArtById
};

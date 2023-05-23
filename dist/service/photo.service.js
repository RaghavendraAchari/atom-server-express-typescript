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
exports.addMultiplePhotos = exports.addPhoto = exports.getAllPhotos = void 0;
const photo_repo_1 = __importDefault(require("../repo/photo.repo"));
const logger_1 = __importDefault(require("../utils/logger"));
function getAllPhotos(pageSize, size, sortBy, sortDirection, filterBy) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield photo_repo_1.default.getAllPhotos(pageSize, size, sortBy, sortDirection, filterBy);
    });
}
exports.getAllPhotos = getAllPhotos;
function addPhoto(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const photo = {
            _id: null,
            thumbnailUrl: data.thumbnailLink,
            originalFileUrl: data.originalFileLink,
            date: data.date,
        };
        logger_1.default.info(photo);
        return yield photo_repo_1.default.addPhoto(photo);
    });
}
exports.addPhoto = addPhoto;
function addMultiplePhotos(list) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield photo_repo_1.default.addMultiplePhotos(list);
    });
}
exports.addMultiplePhotos = addMultiplePhotos;
function getPhotoById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield photo_repo_1.default.findById(id);
    });
}
function deletePhotoById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield photo_repo_1.default.deleteById(id);
    });
}
function updatePhoto(photo) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield photo_repo_1.default.updatePhoto(photo);
    });
}
function getAllPhotoByIdList(list) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield photo_repo_1.default.getPhotosWithMultipleIds(list);
    });
}
exports.default = {
    getAllPhotos,
    addPhoto,
    getPhotoById,
    deletePhotoById,
    updatePhoto,
    getAllPhotoByIdList,
    addMultiplePhotos
};

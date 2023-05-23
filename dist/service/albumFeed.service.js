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
exports.getAllAlbumFeed = void 0;
const mongodb_1 = require("mongodb");
const albumFeed_repo_1 = __importDefault(require("../repo/albumFeed.repo"));
const photo_service_1 = __importDefault(require("./photo.service"));
function getAllAlbumFeed(page, size, sortField, sortOrder, category) {
    return __awaiter(this, void 0, void 0, function* () {
        const albumFeeds = yield albumFeed_repo_1.default.getAllAlbumFeeds(page - 1, size, sortField, sortOrder, category);
        const ids = [];
        albumFeeds.albums.forEach((it) => {
            it.photos.forEach((id) => ids.push(new mongodb_1.ObjectId(id)));
        });
        const photos = yield photo_service_1.default.getAllPhotoByIdList(ids);
        console.log(photos);
        const data = albumFeeds.albums.map(albumFeed => {
            const newObject = {
                _id: albumFeed._id,
                title: albumFeed.title,
                description: albumFeed.description,
                category: albumFeed.category,
                date: albumFeed.date,
                details: albumFeed.details,
                photos: albumFeed.photos.map(id => {
                    return photos.find((photo) => { var _a; return (_a = photo._id) === null || _a === void 0 ? void 0 : _a.equals(id); });
                })
            };
            return newObject;
        });
        return {
            albums: data,
            totalCount: albumFeeds.totalCount,
            currentPage: page,
            totalPages: Math.ceil(albumFeeds.totalCount / size)
        };
    });
}
exports.getAllAlbumFeed = getAllAlbumFeed;
function addAlbumFeed(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const photos = data.photos;
        const insertedIds = yield photo_service_1.default.addMultiplePhotos(photos);
        const values = Object.values(insertedIds);
        const album = {
            _id: new mongodb_1.ObjectId(),
            title: data.title,
            category: data.category,
            date: data.date,
            description: data.description,
            details: data.details,
            photos: values.map(it => it === null || it === void 0 ? void 0 : it.toString())
        };
        const insertedId = yield albumFeed_repo_1.default.addAlbumFeed(album);
        return insertedId;
    });
}
exports.default = {
    getAllAlbumFeed,
    addAlbumFeed
};

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAlbumFeeds = void 0;
const connection_1 = require("../DB/connection");
const collectionName = "AlbumFeed";
const pageSize = 5;
function getAllAlbumFeeds(page, size, sortField, sortOrder, category) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        console.log({
            page,
            size,
            sortField,
            sortOrder,
            category
        });
        const filter = {};
        if (category !== "all") {
            filter.category = {
                $in: [category]
            };
        }
        const data = yield db.collection(collectionName)
            .find(filter)
            .skip(page * pageSize)
            .limit(size)
            .sort(sortField, sortOrder);
        const totalCount = yield data.count();
        return {
            albums: yield data.toArray(),
            totalCount,
            currentPage: page
        };
    });
}
exports.getAllAlbumFeeds = getAllAlbumFeeds;
function getAlbumFeedById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        const data = yield db.collection(collectionName)
            .find({ _id: id });
        return data;
    });
}
function addAlbumFeed(album) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        const data = yield db.collection(collectionName)
            .insertOne(album);
        return data.insertedId;
    });
}
function updateAlbumFeed(album) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        const data = yield db.collection(collectionName)
            .updateOne({ _id: album._id }, album);
        return data.modifiedCount;
    });
}
exports.default = {
    getAllAlbumFeeds,
    getAlbumFeedById,
    addAlbumFeed,
    updateAlbumFeed
};

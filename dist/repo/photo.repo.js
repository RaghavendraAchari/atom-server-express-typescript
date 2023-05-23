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
exports.updatePhoto = exports.addMultiplePhotos = exports.addPhoto = exports.getPhotosWithMultipleIds = exports.getAllPhotos = void 0;
const connection_1 = require("../DB/connection");
const mongodb_1 = require("mongodb");
const logger_1 = __importDefault(require("../utils/logger"));
const collectionName = "Photo";
function getAllPhotos(pageSize, size, sortBy, sortDirection, filterBy) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        logger_1.default.info({ pageSize, size, sortBy, sortDirection, filterBy });
        try {
            const data = yield db.collection(collectionName).find({})
                .skip(pageSize * size)
                .limit(size)
                .sort(sortBy, sortDirection).toArray();
            return data;
        }
        catch (e) {
            logger_1.default.info(e);
            throw e;
        }
    });
}
exports.getAllPhotos = getAllPhotos;
function getPhotosWithMultipleIds(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        logger_1.default.info({ ids });
        try {
            const data = yield db.collection(collectionName).find({ _id: { $in: [...ids] } }).toArray();
            return data;
        }
        catch (e) {
            logger_1.default.info(e);
            throw e;
        }
    });
}
exports.getPhotosWithMultipleIds = getPhotosWithMultipleIds;
function addPhoto(photo) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        logger_1.default.info("connected to bd " + db);
        try {
            logger_1.default.info("Inserting : " + photo);
            const inserted = yield db.collection(collectionName).insertOne(photo);
            logger_1.default.info("Inserted successfully");
            return inserted.insertedId;
        }
        catch (e) {
            logger_1.default.info(e);
            throw e;
        }
    });
}
exports.addPhoto = addPhoto;
function addMultiplePhotos(list) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        logger_1.default.info("connected to bd " + db);
        try {
            logger_1.default.info("Inserting : ");
            const inserted = yield db.collection(collectionName).insertMany(list);
            logger_1.default.info("Inserted successfully");
            return inserted.insertedIds;
        }
        catch (e) {
            logger_1.default.info(e);
            throw e;
        }
    });
}
exports.addMultiplePhotos = addMultiplePhotos;
function updatePhoto(photo) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        logger_1.default.info("connected to bd " + db);
        try {
            logger_1.default.info("Updating : " + photo);
            const inserted = yield db.collection(collectionName).findOneAndUpdate({ _id: photo._id }, photo);
            return inserted.value;
        }
        catch (e) {
            logger_1.default.info(e);
            throw e;
        }
    });
}
exports.updatePhoto = updatePhoto;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        try {
            logger_1.default.info("Searching for document with id: " + id);
            const art = yield db.collection(collectionName).findOne({ _id: new mongodb_1.ObjectId(id) });
            logger_1.default.info(art);
            return art;
        }
        catch (e) {
            logger_1.default.info(e);
            throw e;
        }
    });
}
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        try {
            logger_1.default.info("Deleting the object with id: " + id);
            const deleted = yield db.collection(collectionName).findOneAndDelete({ _id: id });
            logger_1.default.info("Deleted response: " + deleted);
            return deleted;
        }
        catch (e) {
            logger_1.default.info(e);
            throw e;
        }
    });
}
exports.default = {
    addPhoto,
    getAllPhotos,
    findById,
    deleteById,
    updatePhoto,
    getPhotosWithMultipleIds,
    addMultiplePhotos
};

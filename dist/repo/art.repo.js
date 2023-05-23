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
exports.updateArt = exports.addArt = exports.getAllArt = void 0;
const connection_1 = require("../DB/connection");
const mongodb_1 = require("mongodb");
const collectionName = "Art";
function getAllArt(pageSize, size, sortBy, sortDirection, filterBy) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        console.log({ pageSize, size, sortBy, sortDirection, filterBy });
        try {
            const data = yield db.collection(collectionName).find({})
                .skip(pageSize * size)
                .limit(size)
                .sort(sortBy, sortDirection).toArray();
            const count = yield db.collection(collectionName).countDocuments();
            return {
                arts: data,
                totalCount: count
            };
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.getAllArt = getAllArt;
function addArt(art) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        console.log("connected to bd " + db);
        try {
            console.log("Inserting : " + art);
            const inserted = yield db.collection(collectionName).insertOne(art);
            console.log("Inserted successfully");
            return inserted.insertedId;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.addArt = addArt;
function updateArt(art) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        console.log("connected to bd " + db);
        try {
            console.log("Updating : " + art);
            const inserted = yield db.collection(collectionName).findOneAndUpdate({ _id: art._id }, art);
            return inserted.value;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.updateArt = updateArt;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        try {
            console.log("Searching for document with id: " + id);
            const art = yield db.collection(collectionName).findOne({ _id: new mongodb_1.ObjectId(id) });
            console.log(art);
            return art;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        try {
            console.log("Deleting the object with id: " + id);
            const deleted = yield db.collection(collectionName).findOneAndDelete({ _id: id });
            console.log("Deleted response: " + deleted);
            return deleted;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.default = {
    addArt,
    getAllArt,
    findById,
    deleteById,
    updateArt
};

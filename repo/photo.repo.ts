import { getDb } from "../DB/connection";
import Photo from "../model/photo.model";
import { ObjectId, SortDirection } from 'mongodb';

import logger from "../utils/logger";

const collectionName = "Photo";

export async function getAllPhotos(pageSize: number, size: number, sortBy: string, sortDirection: string, filterBy: string) {
    const db = await getDb();
    logger.info({ pageSize, size, sortBy, sortDirection, filterBy });

    try {
        const data = await db.collection<Photo>(collectionName).find<Photo[]>({})
            .skip(pageSize * size)
            .limit(size)
            .sort(sortBy, sortDirection as SortDirection).toArray();

        return data;
    } catch (e) {
        logger.info(e);
        throw e;
    }
}

export async function getPhotosWithMultipleIds(ids: ObjectId[]) {
    const db = await getDb();
    logger.info({ ids });

    try {
        const data = await db.collection<Photo>(collectionName).find<Photo>({ _id: { $in: [...ids] } }).toArray();

        return data;
    } catch (e) {
        logger.info(e);
        throw e;
    }
}

export async function addPhoto(photo: Photo) {
    const db = await getDb();
    logger.info("connected to bd " + db);

    try {
        logger.info("Inserting : " + photo);

        const inserted = await db.collection<Photo>(collectionName).insertOne(photo);
        logger.info("Inserted successfully");

        return inserted.insertedId;
    } catch (e) {
        logger.info(e);
        throw e;
    }
}

export async function addMultiplePhotos(list: Photo[]) {
    const db = await getDb();
    logger.info("connected to bd " + db);

    try {
        logger.info("Inserting : ");

        const inserted = await db.collection<Photo>(collectionName).insertMany(list);
        logger.info("Inserted successfully");

        return inserted.insertedIds;
    } catch (e) {
        logger.info(e);
        throw e;
    }
}

export async function updatePhoto(photo: Photo) {
    const db = await getDb();
    logger.info("connected to bd " + db);

    try {
        logger.info("Updating : " + photo);

        const inserted = await db.collection<Photo>(collectionName).findOneAndUpdate({ _id: photo._id }, photo);

        return inserted.value;
    } catch (e) {
        logger.info(e);
        throw e;
    }
}

async function findById(id: ObjectId): Promise<Photo | null> {
    const db = await getDb();

    try {
        logger.info("Searching for document with id: " + id);

        const art: Photo | null = await db.collection<Photo>(collectionName).findOne<Photo>({ _id: new ObjectId(id) });
        logger.info(art);

        return art;
    } catch (e) {
        logger.info(e);
        throw e
    }
}

async function deleteById(id: ObjectId) {
    const db = await getDb();
    try {
        logger.info("Deleting the object with id: " + id);

        const deleted = await db.collection<Photo>(collectionName).findOneAndDelete({ _id: id });
        logger.info("Deleted response: " + deleted);

        return deleted;
    } catch (e) {
        logger.info(e);
        throw e
    }
}

export default {
    addPhoto,
    getAllPhotos,
    findById,
    deleteById,
    updatePhoto,
    getPhotosWithMultipleIds,
    addMultiplePhotos
}
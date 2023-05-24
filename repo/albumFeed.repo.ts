import { ObjectId, SortDirection } from "mongodb";
import { getDb } from "../DB/connection";
import { AlbumFeed } from "../model/albumFeed.model";

const collectionName = "AlbumFeed";
const pageSize = 5;

export async function getAllAlbumFeeds(page: number, size: number, sortField: string, sortOrder: string, category: string) {
    const db = await getDb();
    console.log({
        page,
        size,
        sortField,
        sortOrder,
        category
    });


    const filter: any = {};

    if (category !== "all") {
        filter.category = {
            $in: [category]
        }
    }

    const data = await db.collection<AlbumFeed>(collectionName)
        .find(filter)
        .skip(page * pageSize)
        .limit(size)
        .sort(sortField, sortOrder as SortDirection);

    const totalCount: number = await data.count();

    return {
        albums: await data.toArray(),
        totalCount,
        currentPage: page
    };
}

async function getAlbumFeedById(id: ObjectId) {
    const db = await getDb();

    const data = await db.collection<AlbumFeed>(collectionName)
        .findOne<AlbumFeed>({ _id: id });

    return data;

}

async function addAlbumFeed(album: AlbumFeed) {
    const db = await getDb();

    const data = await db.collection<AlbumFeed>(collectionName)
        .insertOne(album);

    return data.insertedId;

}

async function updateAlbumFeed(album: AlbumFeed) {
    const db = await getDb();

    const data = await db.collection<AlbumFeed>(collectionName)
        .updateOne({ _id: album._id }, album);

    return data.modifiedCount;
}

async function deleteAlbumfeedById(id: ObjectId) {
    const db = await getDb();
    const data = await db.collection<AlbumFeed>(collectionName).findOneAndDelete({ _id: id });

    return data;
}

export default {
    getAllAlbumFeeds,
    getAlbumFeedById,
    addAlbumFeed,
    updateAlbumFeed,
    deleteAlbumfeedById
}

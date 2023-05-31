import { ObjectId } from "mongodb";
import Photo from "./photo.model";

export interface AlbumFeed {
    _id: ObjectId,
    date: Date,
    title: String,
    description: String,
    photos: string[],
    details: String,
    category: String[],
    publishable: boolean
}

export interface AlbumFeedResponseObject {
    _id: ObjectId,
    date: Date,
    title: String,
    description: String,
    photos: (Photo | undefined)[],
    details: String,
    category: String[],
    publishable: boolean
}
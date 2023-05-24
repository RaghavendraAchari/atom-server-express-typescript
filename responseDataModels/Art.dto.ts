import { ObjectId } from "mongodb";

export default interface ArtResponseData {
    _id: ObjectId | null,
    title: String,
    description: String,
    date: Date,
    thumbnailUrl: String,
    originalFileUrl: String
}
import { ObjectId } from "mongodb";

export default interface AlbumUpdateRequest{
    _id: ObjectId,
    date: Date,
    title: String,
    description: String,
    details: String,
    category: String[],
    publishable: boolean
}
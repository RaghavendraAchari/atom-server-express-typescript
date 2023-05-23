import {ObjectId} from "mongodb";

export default interface Photo{
    _id: ObjectId | null,
    date: Date,
    thumbnailUrl: string,
    originalFileUrl: string
}
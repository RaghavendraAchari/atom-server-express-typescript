import { ObjectId } from "mongodb";

interface Art {
    _id: ObjectId | null,
    title: String,
    description: String,
    date: Date,
    thumbnailUrl: String,
    originalFileUrl: String,
    publishable: boolean
}

export default Art;
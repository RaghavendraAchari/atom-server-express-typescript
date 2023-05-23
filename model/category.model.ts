import {ObjectId} from "mongodb";

export default interface Category{
    _id: ObjectId,
    category: String
}
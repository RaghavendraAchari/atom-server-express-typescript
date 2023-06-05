import { ObjectId } from "mongodb";

interface ArticleDataObject{
    _id: ObjectId,
    title: string,
    description: string,
    date: Date,
    lastEditedOn: Date,
    publishedBy: string,
    content: string,
}
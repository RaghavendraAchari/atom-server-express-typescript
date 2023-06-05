import { ObjectId } from "mongodb";

interface Comment{
    _id: ObjectId,
    date: Date,
    commentedBy: string,
    deleted: boolean,
    replies: Array<Comment>
}

interface Article{
    _id: ObjectId,
    title: string,
    description: string,
    date: Date,
    lastEditedOn: Date,
    publishedBy: string,
    content: string,
    comments: Array<Comment>,
    publishable: boolean,
} 

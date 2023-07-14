import { ObjectId } from "mongodb";
import { body } from "express-validator"

export interface Comment{
    _id: ObjectId,
    date: Date,
    commentedBy: string,
    deleted: boolean,
    replies: Array<Comment>
}

export interface ArticleBase{
    _id: ObjectId | null,
    title: string,
    description: string,
    date: Date,
    publishedBy: string,
    content: object,
    publishable: boolean,
} 
export default interface Article extends ArticleBase{
    lastEditedOn: Date | null,
    comments: Array<Comment> | null,
    coverPhotoLink: string | null
} 

export type NewArticleRequestObject = Omit<Article, "_id">;

//validations
export const newArticleValidation = [
    body('title').notEmpty(),
    body('description').optional(),
    body('date').notEmpty(),
    body('content').notEmpty().isObject(),
    body('comments').optional(),
    body('coverPhotoLink').optional().isURL({protocols:['http', 'https']}),
    body('publishable').isBoolean().default(false)
];

export const updateArticleValidation = [
    body('_id').optional().isMongoId(),
    body('title').notEmpty(),
    body('description').optional(),
    body('date').notEmpty(),
    body('content').notEmpty(),
    body('comments').optional(),
    body('coverPhotoLink').optional().isURL({protocols:['http', 'https']}),
    body('publishable').isBoolean().default(false)
];

import { ObjectId } from "mongodb";
import Article from "../model/article.model";

export type ArticleResponseData = Omit<Article, "lastEditedOn" | "comments" | "coverPhotoLink">;

export type ArticleRequestData = Omit<Article, "lastEditedOn" | "comments" | "coverPhotoLink">;

export type UpdateArticleRequestData = Omit<Article, "lastEditedOn" | "comments" | "coverPhotoLink">;
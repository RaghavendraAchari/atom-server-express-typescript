
import articleRepo from "../repo/article.repo";
import Article from "../model/article.model";
import { ObjectId } from "mongodb";
import { ArticleRequestData, ArticleResponseData } from "../reqResDataModels/article.dto";


export async function getAllArticles(pageSize: number, size: number, sortBy: string, sortDirection: string, filterBy: string) {
    const data = await articleRepo.getAllArticle(pageSize - 1, size, sortBy, sortDirection, filterBy);
    const articles: ArticleResponseData[] = data.articles.map(article => mapToArt(article));

    return {
        articles,
        totalCount: data.totalCount,
        totalPages: Math.ceil(data.totalCount / size),
        currentPage: pageSize
    }
}

export async function getAllArticlesForAdmin() {
    const data = await articleRepo.getAllArticleForAdmin();
    const articles: ArticleResponseData[] = data.articles.map(article => mapToArt(article));

    return {
        articles: articles,
        totalCount: data.totalCount,
    }
}


export async function addArticle(data: ArticleRequestData) {
    const article: Article = {
        _id: null,
        title: data.title,
        description: data.description,
        date: data.date,
        publishable: data.publishable,
        publishedBy: "Raghav Achari",
        content: data.content,
        lastEditedOn: null,
        comments: null,
        coverPhotoLink: null
    }
    console.log(article);

    return await articleRepo.addArticle(article);
}

async function updateArticle(data: ArticleRequestData) {
    const article: Article = {
        _id: data._id,
        title: data.title,
        description: data.description,
        date: data.date,
        publishable: data.publishable,
        publishedBy: "Raghav Achari",
        content: data.content,
        lastEditedOn: null,
        comments: null,
        coverPhotoLink: null
    }
    console.log(article);

    return await articleRepo.updateArticle(article);
}

async function publishArticle(_id: string) {
    return await articleRepo.publishArticle(new ObjectId(_id));
}

async function getArticleById(_id: string) {
    const data = await articleRepo.findById(new ObjectId(_id));
    if (data !== null)
        return mapToArt(data);

    return null;
}


async function deleteArticleById(id: ObjectId) {
    return await articleRepo.deleteById(id);
}

function mapToArt(article: Article): ArticleResponseData {
    const newArticle: ArticleResponseData = {
        _id: article._id,
        date: article.date,
        description: article.description,
        title: article.title,
        publishable: article.publishable,
        publishedBy: "Raghav Achari",
        content: article.content
    }
    return newArticle;
}

export default {
    getAllArticles,
    addArticle,
    updateArticle,
    getArticleById,
    deleteArticleById,
    getAllArticlesForAdmin,
    publishArticle
}
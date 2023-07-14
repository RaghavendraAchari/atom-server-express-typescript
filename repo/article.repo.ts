import { getDb } from "../DB/connection";
import Article from "../model/article.model";
import { ObjectId, SortDirection } from 'mongodb';
import logger from "../utils/logger";

const collectionName = "Article";

export async function getAllArticle(pageSize: number, size: number, sortBy: string, sortDirection: string, filterBy: string) {
    const db = await getDb();
    console.log({ pageSize, size, sortBy, sortDirection, filterBy });

    const filter = {
        publishable: true
    };

    try {
        const data = await db.collection<Article>(collectionName).find<Article>(filter)
            .skip(pageSize * size)
            .limit(size)
            .sort(sortBy, sortDirection as SortDirection).toArray();

        const count = await db.collection<Article>(collectionName).countDocuments(filter);

        return {
            articles: data,
            totalCount: count
        };
    } catch (e) {
        logger.info(e, "Error in db operation");
        throw e;
    }
}

async function getAllArticleForAdmin() {
    const db = await getDb();

    try {
        const data = await db.collection<Article>(collectionName).find<Article>({})
            .sort("date", "desc").toArray();

        const count = await db.collection<Article>(collectionName).countDocuments();

        return {
            articles: data,
            totalCount: count
        };
    } catch (e) {
        logger.info(e, "Error in db operation");
        throw e;
    }
}

export async function addArticle(article: Article) {
    const db = await getDb();
    console.log("connected to bd " + db);

    try {
        console.log("Inserting : " + article);

        const inserted = await db.collection<Article>(collectionName).insertOne(article);
        console.log("Inserted successfully");

        return inserted.insertedId;
    } catch (e) {
        logger.info(e, "Error in db operation");
        throw e;
    }
}

export async function updateArticle(article: Article) {
    const db = await getDb();
    console.log("connected to bd " + db);

    try {
        console.log("Updating : ", {...article});

        const inserted = await db.collection<Article>(collectionName)
            .findOneAndUpdate({_id: article._id}, {
                $set: {
                    ...article
                }
            }, { returnDocument: "after" });
        
        console.log({inserted}, "Updated the art");

        return inserted.value;
    } catch (e) {
        logger.info(e, "Error in db operation");
        throw e;
    }
}

async function findById(_id: ObjectId): Promise<Article | null> {
    const db = await getDb();

    try {
        console.log("Searching for document with id: " + _id);

        const art: Article | null = await db.collection<Article>(collectionName)
            .findOne<Article>({_id});
        console.log(art);

        return art;
    } catch (e) {
        logger.info(e, "Error in db operation");
        throw e
    }
}

async function deleteById(_id: ObjectId) {
    const db = await getDb();
    try {
        console.log("Deleting the object with id: " + _id);

        const deleted = await db.collection<Article>(collectionName).findOneAndDelete({ _id});
        console.log("Deleted response: " + deleted);

        return deleted.value;
    } catch (e) {
        logger.info(e, "Error in db operation");
        throw e
    }
}

async function publishArticle(_id: ObjectId) {
    const db = await getDb();

    try{
        const result = await db.collection<Article>(collectionName).findOneAndUpdate({
            _id,
            publishable: false
        }, {
            $set: {
                publishable: true
            }
        });

        if(result.ok)
            return true;
        else
            return false;
    }catch(e){
        logger.info(e, "Error in db operation");
        throw e;
    }
    
}

export default {
    addArticle,
    getAllArticle,
    findById,
    deleteById,
    updateArticle,
    getAllArticleForAdmin,
    publishArticle
}
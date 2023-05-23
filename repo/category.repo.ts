import { getDb } from "../DB/connection";
import Category from "../model/category.model";
import { ObjectId, SortDirection } from 'mongodb';

import logger from "../utils/logger";

const collectionName = "Categories";

async function getAllCategories() {
    const db = await getDb();

    const data = await db.collection<Category>(collectionName).find().toArray();
    logger.info(data, "Fetched Categories");

    return data;

}

export default {
    getAllCategories
}
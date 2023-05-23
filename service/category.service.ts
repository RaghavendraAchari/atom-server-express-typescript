import { ObjectId } from "mongodb";

import categoryRepo from "../repo/category.repo";
import Category from "../model/category.model";
import logger from "../utils/logger";

async function getAllCategories() {
    return await categoryRepo.getAllCategories();
}

export default {
    getAllCategories
}
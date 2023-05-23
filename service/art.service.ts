import dbRepo from "../repo/art.repo";
import Art from "../model/art.model";
import { ObjectId } from "mongodb";
import artRepo from "../repo/art.repo";


export async function getAllArts(pageSize: number, size: number, sortBy: string, sortDirection: string, filterBy: string) {
    const data = await dbRepo.getAllArt(pageSize - 1, size, sortBy, sortDirection, filterBy);
    return {
        arts: data.arts,
        totalCount: data.totalCount,
        totalPages: Math.ceil(data.totalCount / size),
        currentPage: pageSize
    }
}


export async function addArt(data: any) {
    const art: Art = {
        _id: null,
        title: data.title,
        description: data.description,
        thumbnailUrl: data.thumbnailUrl,
        originalFileUrl: data.originalFileUrl,
        date: data.date,
    }
    console.log(art);

    return await dbRepo.addArt(art);
}

async function getArtById(id: ObjectId) {
    return await artRepo.findById(id);
}


async function deleteArtById(id: ObjectId) {
    return await artRepo.deleteById(id);
}

export default {
    getAllArts,
    addArt,
    getArtById,
    deleteArtById
}
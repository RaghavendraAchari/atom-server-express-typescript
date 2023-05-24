import dbRepo from "../repo/art.repo";
import Art from "../model/art.model";
import { ObjectId } from "mongodb";
import artRepo from "../repo/art.repo";
import ArtResponseData from "../responseDataModels/Art.dto";


export async function getAllArts(pageSize: number, size: number, sortBy: string, sortDirection: string, filterBy: string) {
    const data = await dbRepo.getAllArt(pageSize - 1, size, sortBy, sortDirection, filterBy);
    const arts: ArtResponseData[] = data.arts.map(art => mapToArt(art));

    return {
        arts: arts,
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
    const data = await artRepo.findById(id);
    if (data !== null)
        return mapToArt(data);

    return null;
}


async function deleteArtById(id: ObjectId) {
    return await artRepo.deleteById(id);
}

function mapToArt(art: Art): ArtResponseData {
    const newArt: ArtResponseData = {
        _id: art._id,
        date: art.date,
        description: art.description,
        originalFileUrl: art.originalFileUrl,
        title: art.title,
        thumbnailUrl: art.thumbnailUrl
    }
    return newArt;
}

export default {
    getAllArts,
    addArt,
    getArtById,
    deleteArtById
}
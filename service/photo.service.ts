import { ObjectId } from "mongodb";

import photoRepo from "../repo/photo.repo";
import Photo from "../model/photo.model";
import logger from "../utils/logger";


export async function getAllPhotos(pageSize: number, size: number, sortBy: string, sortDirection: string, filterBy: string) {
    return await photoRepo.getAllPhotos(pageSize, size, sortBy, sortDirection, filterBy);
}

async function getAllPhotosForAdmin() {
    return await photoRepo.getAllPhotosForAdmin();
}

async function addPhoto(data: any) {
    const photo: Photo = {
        _id: null,
        thumbnailUrl: data.thumbnailLink,
        originalFileUrl: data.originalFileLink,
        date: data.date,
    }
    logger.info(photo);

    return await photoRepo.addPhoto(photo);
}

export async function addMultiplePhotos(list: Photo[]) {
    return await photoRepo.addMultiplePhotos(list);
}

async function getPhotoById(id: ObjectId) {
    return await photoRepo.findById(id);
}


async function deletePhotoById(id: ObjectId) {
    return await photoRepo.deleteById(id);
}

async function updatePhoto(photo: Photo) {
    return await photoRepo.updatePhoto(photo);
}

async function getAllPhotoByIdList(list: ObjectId[]) {
    return await photoRepo.getPhotosWithMultipleIds(list);
}


export default {
    getAllPhotos,
    addPhoto,
    getPhotoById,
    deletePhotoById,
    updatePhoto,
    getAllPhotoByIdList,
    addMultiplePhotos,
    getAllPhotosForAdmin
}
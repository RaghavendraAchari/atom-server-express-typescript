import { ObjectId } from "mongodb";
import { AlbumFeed, AlbumFeedResponseObject } from "../model/albumFeed.model";
import Photo from "../model/photo.model";
import albumFeedRepo from "../repo/albumFeed.repo";
import photoService from "./photo.service";

export async function getAllAlbumFeed(page: number, size: number, sortField: string, sortOrder: string, category: string) {
    const albumFeeds = await albumFeedRepo.getAllAlbumFeeds(page - 1, size, sortField, sortOrder, category);

    const ids: ObjectId[] = [];
    albumFeeds.albums.forEach((it) => {
        it.photos.forEach((id: string) => ids.push(new ObjectId(id)));
    });

    const photos: Photo[] = await photoService.getAllPhotoByIdList(ids);

    console.log(photos);

    const data: AlbumFeedResponseObject[] = albumFeeds.albums.map(albumFeed => {
        const newObject: AlbumFeedResponseObject = {
            _id: albumFeed._id,
            title: albumFeed.title,
            description: albumFeed.description,
            category: albumFeed.category,
            date: albumFeed.date,
            details: albumFeed.details,
            photos: albumFeed.photos.map(id => {
                return photos.find((photo) => photo._id?.equals(id))
            })
        }

        return newObject;
    });

    return {
        albums: data,
        totalCount: albumFeeds.totalCount,
        currentPage: page,
        totalPages: Math.ceil(albumFeeds.totalCount as number / size)
    };
}

async function addAlbumFeed(data: AlbumFeedResponseObject) {
    const photos: Photo[] = data.photos as Photo[];

    const insertedIds = await photoService.addMultiplePhotos(photos);

    const values = Object.values(insertedIds);

    const album: AlbumFeed = {
        _id: new ObjectId(),
        title: data.title,
        category: data.category,
        date: data.date,
        description: data.description,
        details: data.details,
        photos: values.map(it => it?.toString()) as string[]
    }

    const insertedId = await albumFeedRepo.addAlbumFeed(album);

    return insertedId;
}

export default {
    getAllAlbumFeed,
    addAlbumFeed
}
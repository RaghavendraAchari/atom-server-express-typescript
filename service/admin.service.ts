import albumFeedService from "./albumFeed.service"
import artService from "./art.service";
import articleService from "./article.service";
import photoService from "./photo.service";


async function getAllAlbums() {
    return await albumFeedService.getAllAlbumFeedForAdmin();
}

async function getAllArts() {
    return await artService.getAllArtsForAdmin();
}

async function getAllArticles() {
    return await articleService.getAllArticlesForAdmin();
}

async function getAllPhotos() {
    return await photoService.getAllPhotosForAdmin();
}

export default {
    getAllAlbums,
    getAllArts,
    getAllPhotos,
    getAllArticles
}
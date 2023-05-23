import { ObjectId } from "mongodb";

interface Art {
    _id: ObjectId | null,
    title: String,
    description: String,
    date: Date,
    thumbnailUrl: String,
    originalFileUrl: String
}

// class Art {
//     constructor(
//         public title: String,
//         public description: String,
//         public date: Date,
//         public thumbnailLink: String,
//         public originalFileLink: String
//     ){}
// }

export default Art;
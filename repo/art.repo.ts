import { getDb } from "../DB/connection";
import Art from "../model/art.model";
import { ObjectId, SortDirection } from 'mongodb';

const collectionName = "Art";

export async function getAllArt(pageSize: number, size: number, sortBy: string, sortDirection: string, filterBy: string) {
    const db = await getDb();
    console.log({ pageSize, size, sortBy, sortDirection, filterBy });

    try {
        const data = await db.collection<Art>(collectionName).find<Art>({
            publishable: true
        })
            .skip(pageSize * size)
            .limit(size)
            .sort(sortBy, sortDirection as SortDirection).toArray();
        const count = await db.collection<Art>(collectionName).countDocuments();

        return {
            arts: data,
            totalCount: count
        };
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function getAllArtForAdmin() {
    const db = await getDb();

    try {
        const data = await db.collection<Art>(collectionName).find<Art>({})
            .sort("date", "desc").toArray();

        const count = await db.collection<Art>(collectionName).countDocuments();

        return {
            arts: data,
            totalCount: count
        };
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function addArt(art: Art) {
    const db = await getDb();
    console.log("connected to bd " + db);

    try {
        console.log("Inserting : " + art);

        const inserted = await db.collection<Art>(collectionName).insertOne(art);
        console.log("Inserted successfully");

        return inserted.insertedId;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function updateArt(art: Art) {
    const db = await getDb();
    console.log("connected to bd " + db);

    try {
        console.log("Updating : " + art);

        const inserted = await db.collection<Art>(collectionName).findOneAndUpdate({ _id: art._id }, {
            $set: {...art}
        });

        return inserted.value;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function findById(id: ObjectId): Promise<Art | null> {
    const db = await getDb();

    try {
        console.log("Searching for document with id: " + id);

        const art: Art | null = await db.collection<Art>(collectionName).findOne<Art>({ _id: new ObjectId(id) });
        console.log(art);

        return art;
    } catch (e) {
        console.log(e);
        throw e
    }
}

async function deleteById(id: ObjectId) {
    const db = await getDb();
    try {
        console.log("Deleting the object with id: " + id);

        const deleted = await db.collection<Art>(collectionName).findOneAndDelete({ _id: id });
        console.log("Deleted response: " + deleted);

        return deleted;
    } catch (e) {
        console.log(e);
        throw e
    }
}

async function publishArt(id: ObjectId) {
    const db = await getDb();

    try{
        const result = await db.collection<Art>(collectionName).findOneAndUpdate({
            _id: id,
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
        throw e;
    }
    
}

export default {
    addArt,
    getAllArt,
    findById,
    deleteById,
    updateArt,
    getAllArtForAdmin,
    publishArt
}
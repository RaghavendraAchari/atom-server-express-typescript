import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import logger from './utils/logger';

import { connectToDatabase, getConnectionObject } from './DB/connection';

import albumFeedRouter from "./routes/albumFeed.route";
import artRouter from "./routes/art.route";
import photoRouter from "./routes/photo.route";
import { authenticate, generateToken } from './auth/auth';
import categoryRouter from './routes/category.route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors<Request>())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api/albumfeeds", albumFeedRouter);
app.use("/api/arts", artRouter);
app.use("/api/photos", photoRouter)
app.use("/api/categories", categoryRouter)

//home route
app.post('/token', async (req: Request, res: Response) => {
    logger.info(req.body);

    try {
        const token = await generateToken(req.body['username'], req.body['password']);
        logger.info(token, "TOKEN: ")

        return res.status(200).json({ accessToken: token })
    } catch (e) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/validate', authenticate, async (req: Request, res: Response) => {
    return res.status(200).end();
});

app.post('/logout', authenticate, async (req: Request, res: Response) => {
    return res.status(200).end();
});

app.get('/', (req: Request, res: Response) => {
    return res.status(200).send("App is running..");
});

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}).catch(err => {
    console.log(err)
});


function shutdown() {
    async function cleanup() {
        const connection = getConnectionObject();
        console.log("Closing the db connection.");

        connection?.close().then(() => {
            console.log("Db connection closed");
        });
    }

    cleanup();
}

process.on('exit', shutdown)
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
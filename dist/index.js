"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./utils/logger"));
const connection_1 = require("./DB/connection");
const albumFeed_route_1 = __importDefault(require("./routes/albumFeed.route"));
const art_route_1 = __importDefault(require("./routes/art.route"));
const photo_route_1 = __importDefault(require("./routes/photo.route"));
const auth_1 = require("./auth/auth");
const category_route_1 = __importDefault(require("./routes/category.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//routes
app.use("/api/albumfeeds", albumFeed_route_1.default);
app.use("/api/arts", art_route_1.default);
app.use("/api/photos", photo_route_1.default);
app.use("/api/categories", category_route_1.default);
//home route
app.post('/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(req.body);
    try {
        const token = yield (0, auth_1.generateToken)(req.body['username'], req.body['password']);
        logger_1.default.info(token, "TOKEN: ");
        return res.status(200).json({ accessToken: token });
    }
    catch (e) {
        return res.status(500).json({ message: "Internal server error" });
    }
}));
app.post('/validate', auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).end();
}));
app.post('/logout', auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).end();
}));
app.get('/', (req, res) => {
    return res.status(200).send("App is running..");
});
(0, connection_1.connectToDatabase)().then(() => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}).catch(err => {
    console.log(err);
});
function shutdown() {
    function cleanup() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, connection_1.getConnectionObject)();
            console.log("Closing the db connection.");
            connection === null || connection === void 0 ? void 0 : connection.close().then(() => {
                console.log("Db connection closed");
            });
        });
    }
    cleanup();
}
process.on('exit', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

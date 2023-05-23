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
exports.generateToken = exports.authenticate = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("./../utils/logger"));
const connection_1 = require("../DB/connection");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const expiryTime = 1000 * 60 * 60 * 2;
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).send("Invalid User");
                }
                req.body.user = user;
                next();
            });
        }
        else {
            res.sendStatus(401);
        }
    });
}
exports.authenticate = authenticate;
;
function generateToken(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getDb)();
        try {
            const user = yield db.collection('User').findOne({ username: username, password: password, isActive: true });
            logger_1.default.info(user, "Active User");
            if (user == null) {
                throw Error("Not a valid user");
            }
            const jwtToken = jsonwebtoken_1.default.sign({
                user: user.username,
            }, JWT_SECRET, { expiresIn: expiryTime });
            return jwtToken;
        }
        catch (e) {
            throw Error("Internal server error");
        }
    });
}
exports.generateToken = generateToken;

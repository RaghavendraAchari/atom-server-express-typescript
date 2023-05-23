import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, {Secret, } from "jsonwebtoken";
import logger from "./../utils/logger";

import { getDb } from "../DB/connection";
dotenv.config();


const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;
const expiryTime = 1000 * 60 * 60 * 2;

export async function authenticate (req:Request, res: Response, next:NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send("Invalid User");
            }

            req.body.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

export async function generateToken(username: string, password: string){
    const db = await getDb();

    try{
        const user = await db.collection('User').findOne({username: username, password: password, isActive: true});
        logger.info(user, "Active User")

        if(user == null){
            throw Error("Not a valid user");
        }
        
        const jwtToken = jwt.sign({
            user: user.username,
        }, JWT_SECRET, { expiresIn: expiryTime });

        return jwtToken;
    }catch(e){
        throw Error("Internal server error");
    }
}

import { NextFunction, Request, Response } from "express";
import config from "../config/config";
import * as jwt from "jsonwebtoken";


export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(403).json({ message: "User not Login! :(" });
    }

    const token = authorization.split(" ")[1];

    let jwtPayLoad;

    try {
        jwtPayLoad = <any>jwt.verify(token, config.jwtSecret)
        res.locals.jwtPayLoad = jwtPayLoad;
    } catch (error) {
        res.status(401).send;
    }

    const { iduser, email } = jwtPayLoad;
    const newToken = jwt.sign({ iduser, email }, config.jwtSecret, {expiresIn: "24h"});

    res.setHeader("token", newToken);

    next();
}
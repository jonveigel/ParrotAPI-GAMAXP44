import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { postRepository } from "../repositories/postRepository";
import { userRepository } from "../repositories/userRepository";

export class PostController {
    async create (req: Request, res: Response) {
        const { authorization } = req.headers;

        if(!authorization) {
            return
        }

        const token = authorization.split(" ")[1];

        let iduser;

        try {
            const jwtPayLoad = <any>jwt.verify(token, config.jwtSecret);
            iduser = jwtPayLoad.userId
        } catch (error) {
            return res.status(401).send;
        }

        const user = await userRepository.findOneBy({ iduser });
        const { content } = req.body;

        if (!user) {
            return res.status(404).json({ message: "User not Found :3"})
        }

        try {
            const newPost = postRepository.create({ content, user });
            await postRepository.save(newPost);
        } catch (error) {
            return res.status(400).send("Content not supported :P")
        }

        return res.status(201).json({ message: "Post Created!!!!!" });
    }

    async listAll(req: Request, res: Response) {
        const posts = await postRepository.find({
            relations: { user: true },
            select: { user: {
                iduser: true,
                name: true,
                apartment: true,
                userphoto: true
            }}
        })

        return res.send(posts);
    }
}
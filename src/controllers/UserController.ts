import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export class UserController {
    async listAll(req: Request, res: Response) {
        const users = await userRepository.find({ select: ['iduser', 'name', 'email', 'apartment', 'userphoto'] });

        return res.send(users)
    }
}
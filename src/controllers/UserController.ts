import { Request, Response } from "express";
import { User } from "../entity/User";
import { userRepository } from "../repositories/userRepository";

export class UserController {
    async listAll(req: Request, res: Response) {
        const users = await userRepository.find({ select: ['iduser', 'name', 'email', 'apartment', 'userphoto'] });

        return res.send(users)
    }

    async getOneById(req: Request, res: Response) {
        const iduser: number = parseInt(req.params.iduser, 10);

        let user: User;

        try {
            user = await userRepository.findOneByOrFail({ iduser });
        } catch (error) {
            return res.status(404).send("User not found :X");
        }

        return res.send(user);
    }
}
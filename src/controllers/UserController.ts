import { validate } from "class-validator";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
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

    async create (req: Request, res: Response) {
        const { name, email, apartment, password, userphoto } = req.body;
        const userExists = await userRepository.findOneBy({ email });

        if(userExists) {
            return res.status(400).send("E-mail already registered! :)")
        }

        let user: User = new User();
        user.name = name
        user.email = email
        user.password = password
        user.apartment = apartment
        user.userphoto = userphoto
        user.role = "USER"

        const errors = await validate(user);
        if(errors.length > 0) {
            return res.status(400).send(errors);
        }

        user.passwordHash();

        try {
            await userRepository.save(user);
        } catch (error) {
            return res.status(400).send(error);
        }

        return res.status(201).send("User Created!!!!!!!");
    }

    async editUser(req: Request, res: Response) {
        const { authorization } = req.headers;
        if(!authorization) {
            return;
        }

        const token = authorization.split(" ")[1];

        let iduser;

        try {
            const jwtPayLoad = <any>jwt.verify(token, config.jwtSecret);
            iduser = jwtPayLoad.userId;
        } catch (error) {
            return res.status(401).send;
        }

        const { name, email, apartment, userphoto } = req.body;

        let user: User = await userRepository.findOneByOrFail({ iduser });
        if(name) user.name = name
        if(email) user.email = email
        if(apartment) user.apartment = apartment
        if(userphoto) user.userphoto = userphoto

        const errors = await validate(user);
        if(errors.length > 0) {
            return res.send(400).send(errors)
        }

        try {
            await userRepository.save(user)
        } catch (error) {
            return res.status(400);
        }

        return res.status(201).send("User edited successfully!! :)");
    }
}
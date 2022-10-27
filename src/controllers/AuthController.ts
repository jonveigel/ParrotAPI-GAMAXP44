import { Request, Response } from "express";
import config from "../config/config";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { userRepository } from "../repositories/userRepository";

export class AuthController {
    async login(req: Request, res: Response) {
        
        let { email, password } = req.body;

        const userExists = await userRepository.findOneBy({ email });

        if((!userExists && password)) {
            return res.status(400).send("Invalid email or password :(");
        }

        let user: User;

        try {
            user = await userRepository.findOneOrFail({ where: { email }});
        } catch (error) {
            return res.status(401).send("User not found :X");
        }

        if(!user.UnencryptedPassword(password)) {
            return res.status(401).send("Password incorrect or user not found /:");
        }

        const token = jwt.sign({ userId: user.iduser, email: user.email}, config.jwtSecret, {expiresIn: "24h"});

        return res.send({
            token: token,
            user: { iduser: user.iduser,
            name: user.name,
            email: user.email,
            apartment: user.apartment }
        })
    }
}
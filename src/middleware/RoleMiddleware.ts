import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const roleMiddleware = (roles: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const iduser = res.locals.jwtPayLoad.userId;

        const userRepository = AppDataSource.getRepository(User)
        let user: User = await userRepository.findOneByOrFail({ iduser });

        if(user.role !== roles) {
            return res.status(401).send("Only Admin is autorized to request! :(");
        }

        if(roles.indexOf(user.role) > -1) {
            next();
        } else {
            res.status(401).send();
        }
    }
}
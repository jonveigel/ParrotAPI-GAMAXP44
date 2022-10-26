import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";

export class UserSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userRepository = dataSource.getRepository(User)

        const userData1 = {
            name: 'user1',
            email: 'user1@user.com',
            apartment: 1,
            password: await bcrypt.hash('admin', 8),
            userphoto:'',
            role: 'USER',
        }

        const user1Exists = await userRepository.findOneBy( { email: userData1.email });
        if (!user1Exists) {
            const newUser1 = userRepository.create(userData1);
            await userRepository.save(newUser1);
        }

        const userData2 = {
            name: 'user2',
            email: 'user2@user.com',
            apartment: 2,
            password: await bcrypt.hash('admin', 8),
            userphoto:'',
            role: 'USER',
        }

        const user2Exists = await userRepository.findOneBy( { email: userData2.email });

        if (!user2Exists) {
            const newUser2 = userRepository.create(userData2);
            await userRepository.save(newUser2);
        }
    }
}
import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { AdminSeeder } from "./AdminSeeder";
import { PostSeeder } from "./PostSeeder";
import { UserSeeder } from "./UserSeeder";

export class MainSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        await runSeeder(dataSource, AdminSeeder);
        await runSeeder(dataSource, UserSeeder);
        await runSeeder(dataSource, PostSeeder);
    }
}
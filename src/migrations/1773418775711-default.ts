import { MigrationInterface, QueryRunner } from "typeorm";

export class default1773418775711 implements MigrationInterface {
    name = 'default1773418775711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id\` \`iduser\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`id\` \`idpost\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`content\` varchar(300) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`content\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`idpost\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`iduser\` \`id\` int NOT NULL AUTO_INCREMENT`);
    }

}

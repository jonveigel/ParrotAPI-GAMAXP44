import { MigrationInterface, QueryRunner } from "typeorm";

export class default1773511531942 implements MigrationInterface {
    name = 'default1773511531942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userphoto\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userphoto\``);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class default1773511156811 implements MigrationInterface {
    name = 'default1773511156811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_52378a74ae3724bcab44036645b\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`user_id\` \`user_iduser\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_8b1fbd76180b52bdf9edb0911ed\` FOREIGN KEY (\`user_iduser\`) REFERENCES \`user\`(\`iduser\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_8b1fbd76180b52bdf9edb0911ed\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`user_iduser\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_52378a74ae3724bcab44036645b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`iduser\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

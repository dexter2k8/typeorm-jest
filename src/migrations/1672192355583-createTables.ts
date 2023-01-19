import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1672192355583 implements MigrationInterface {
    name = 'createTables1672192355583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "technologies" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, CONSTRAINT "UQ_46800813f460eb131823371caee" UNIQUE ("name"), CONSTRAINT "PK_9a97465b79568f00becacdd4e4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(360) NOT NULL, "userId" uuid, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(120) NOT NULL, "isAdm" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "state" character varying(2) NOT NULL, "zipCode" character varying(8), "userId" uuid, CONSTRAINT "REL_95c93a584de49f0b0e13f75363" UNIQUE ("userId"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_technologies_technologies" ("projectsId" integer NOT NULL, "technologiesId" integer NOT NULL, CONSTRAINT "PK_77d95d8b7c4c6875e8edba2a937" PRIMARY KEY ("projectsId", "technologiesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_673d02c381e5ca853bb1fd0113" ON "projects_technologies_technologies" ("projectsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a6ec65771cb490a29fea3917f0" ON "projects_technologies_technologies" ("technologiesId") `);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projects_technologies_technologies" ADD CONSTRAINT "FK_673d02c381e5ca853bb1fd01133" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projects_technologies_technologies" ADD CONSTRAINT "FK_a6ec65771cb490a29fea3917f0b" FOREIGN KEY ("technologiesId") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_technologies_technologies" DROP CONSTRAINT "FK_a6ec65771cb490a29fea3917f0b"`);
        await queryRunner.query(`ALTER TABLE "projects_technologies_technologies" DROP CONSTRAINT "FK_673d02c381e5ca853bb1fd01133"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a6ec65771cb490a29fea3917f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_673d02c381e5ca853bb1fd0113"`);
        await queryRunner.query(`DROP TABLE "projects_technologies_technologies"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "technologies"`);
    }

}

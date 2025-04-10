import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1744282741780 implements MigrationInterface {
    name = 'CreateInitialSchema1744282741780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cart_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "carts_status_check"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."carts_status_enum" AS ENUM('OPEN', 'ORDERED')`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "status" "public"."carts_status_enum" NOT NULL DEFAULT 'OPEN'`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "CHK_d48e4b6afddae03af6b5d1de5a" CHECK ("count" > 0)`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_6385a745d9e12a89b859bb25623"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "CHK_d48e4b6afddae03af6b5d1de5a"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."carts_status_enum"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "status" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "updated_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "created_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "carts_status_check" CHECK (((status)::text = ANY ((ARRAY['OPEN'::character varying, 'ORDERED'::character varying])::text[])))`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

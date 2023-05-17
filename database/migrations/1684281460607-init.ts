import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1684281460607 implements MigrationInterface {
    name = 'Init1684281460607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts"."categoria" ("id" SERIAL NOT NULL, "nombre" character varying(50) NOT NULL, "id_post" integer, CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios"."recomendacion" ("id" SERIAL NOT NULL, "mensaje" character varying(255) NOT NULL, "id_perfil" integer, "id_remitente" integer, CONSTRAINT "PK_ced84b453db88ea00867301fbb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios"."experiencia" ("id" SERIAL NOT NULL, "titulo" character varying(100) NOT NULL, "descripcion" character varying, "id_usuario" integer NOT NULL, "nombre_empresa" character varying, "id_pagina" integer, CONSTRAINT "PK_5943bf80b1f97351d93d9db6bf4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios"."usuario" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "apellido" character varying(100) NOT NULL, "descripcion" character varying(255) NOT NULL, "fecha_nacimiento" date NOT NULL, "cedula_identidad" character varying(20) NOT NULL, "url_perfil" character varying(255), "url_banner" character varying(255), "skills" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "empresa"."post_usuario" ("id" SERIAL NOT NULL, "id_post" integer, "id_usuario" integer, CONSTRAINT "PK_cbcd228439548e238f775fb3f78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts"."post" ("id" SERIAL NOT NULL, "url_imagen" character varying(255), "descripcion" character varying(255) NOT NULL, "id_pagina" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "empresa"."pagina" ("id" SERIAL NOT NULL, "nombre" character varying(50) NOT NULL, "descripcion" character varying(255) NOT NULL, "url_perfil" character varying(255), "url_banner" character varying(255), CONSTRAINT "PK_c36cb7b5633de0c1ccff914dbdf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "empresa"."pagina_usuario" ("id" SERIAL NOT NULL, "id_pagina" integer, "id_usuario" integer, CONSTRAINT "PK_73fb46be64423694efaad245abf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts"."categoria" ADD CONSTRAINT "FK_b000883f114dc56049751ab145f" FOREIGN KEY ("id_post") REFERENCES "posts"."post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios"."recomendacion" ADD CONSTRAINT "FK_ca71136289ef0d41d184bc6421a" FOREIGN KEY ("id_perfil") REFERENCES "usuarios"."usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios"."recomendacion" ADD CONSTRAINT "FK_e08aa6fd3f31288ecd0e745d5f3" FOREIGN KEY ("id_remitente") REFERENCES "usuarios"."usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios"."experiencia" ADD CONSTRAINT "FK_5b1facb1a57351580fda7759825" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"."usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios"."experiencia" ADD CONSTRAINT "FK_a48c7d151cd22385b51d39ab0d6" FOREIGN KEY ("id_pagina") REFERENCES "empresa"."pagina"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "empresa"."post_usuario" ADD CONSTRAINT "FK_bd395d1024facb54aa8f74ac61f" FOREIGN KEY ("id_post") REFERENCES "posts"."post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "empresa"."post_usuario" ADD CONSTRAINT "FK_b1a383d6b2feeb4e15e0d27ea6b" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"."usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts"."post" ADD CONSTRAINT "FK_fae17dc3b52f31c99802927f992" FOREIGN KEY ("id_pagina") REFERENCES "empresa"."pagina"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "empresa"."pagina_usuario" ADD CONSTRAINT "FK_9f62deab4888aaafea65a1da09d" FOREIGN KEY ("id_pagina") REFERENCES "empresa"."pagina"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "empresa"."pagina_usuario" ADD CONSTRAINT "FK_264b7f5768f583137129a953d76" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"."usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "empresa"."pagina_usuario" DROP CONSTRAINT "FK_264b7f5768f583137129a953d76"`);
        await queryRunner.query(`ALTER TABLE "empresa"."pagina_usuario" DROP CONSTRAINT "FK_9f62deab4888aaafea65a1da09d"`);
        await queryRunner.query(`ALTER TABLE "posts"."post" DROP CONSTRAINT "FK_fae17dc3b52f31c99802927f992"`);
        await queryRunner.query(`ALTER TABLE "empresa"."post_usuario" DROP CONSTRAINT "FK_b1a383d6b2feeb4e15e0d27ea6b"`);
        await queryRunner.query(`ALTER TABLE "empresa"."post_usuario" DROP CONSTRAINT "FK_bd395d1024facb54aa8f74ac61f"`);
        await queryRunner.query(`ALTER TABLE "usuarios"."experiencia" DROP CONSTRAINT "FK_a48c7d151cd22385b51d39ab0d6"`);
        await queryRunner.query(`ALTER TABLE "usuarios"."experiencia" DROP CONSTRAINT "FK_5b1facb1a57351580fda7759825"`);
        await queryRunner.query(`ALTER TABLE "usuarios"."recomendacion" DROP CONSTRAINT "FK_e08aa6fd3f31288ecd0e745d5f3"`);
        await queryRunner.query(`ALTER TABLE "usuarios"."recomendacion" DROP CONSTRAINT "FK_ca71136289ef0d41d184bc6421a"`);
        await queryRunner.query(`ALTER TABLE "posts"."categoria" DROP CONSTRAINT "FK_b000883f114dc56049751ab145f"`);
        await queryRunner.query(`DROP TABLE "empresa"."pagina_usuario"`);
        await queryRunner.query(`DROP TABLE "empresa"."pagina"`);
        await queryRunner.query(`DROP TABLE "posts"."post"`);
        await queryRunner.query(`DROP TABLE "empresa"."post_usuario"`);
        await queryRunner.query(`DROP TABLE "usuarios"."usuario"`);
        await queryRunner.query(`DROP TABLE "usuarios"."experiencia"`);
        await queryRunner.query(`DROP TABLE "usuarios"."recomendacion"`);
        await queryRunner.query(`DROP TABLE "posts"."categoria"`);
    }

}

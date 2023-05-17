import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from 'fs';

export class seeds1670550066906 implements MigrationInterface {
  name = 'seeds1670550066906'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const queriesUsuario = await fs.readFileSync(
      __dirname + '/usuario.sql',
      {encoding: 'utf-8'}
    )

    const queriesPagina = await fs.readFileSync(
      __dirname + '/pagina.sql',
      {encoding: 'utf-8'}
    )

    const queriesPaginaUsuario = await fs.readFileSync(
      __dirname + '/pagina_usuario.sql',
      {encoding: 'utf-8'}
    )

    const queriesPost = await fs.readFileSync(
      __dirname + '/post.sql',
      {encoding: 'utf-8'}
    )

    const queriesPostUsuario = await fs.readFileSync(
      __dirname + '/post_usuario.sql',
      {encoding: 'utf-8'}
    )

    const queriesCategoria = await fs.readFileSync(
      __dirname + '/categoria.sql',
      {encoding: 'utf-8'}
    )
    
    const queriesRecomendacion = await fs.readFileSync(
      __dirname + '/recomendacion.sql',
      {encoding: 'utf-8'}
    )

    const queriesExperiencia = await fs.readFileSync(
      __dirname + '/experiencia.sql',
      {encoding: 'utf-8'}
    )

    await queryRunner.query(queriesUsuario.toString())
    await queryRunner.query(queriesPagina.toString())
    await queryRunner.query(queriesPaginaUsuario.toString())
    await queryRunner.query(queriesPost.toString())
    await queryRunner.query(queriesPostUsuario.toString())
    await queryRunner.query(queriesCategoria.toString())
    await queryRunner.query(queriesRecomendacion.toString())
    await queryRunner.query(queriesExperiencia.toString())
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}

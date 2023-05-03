
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.subTipos, table => {
            
            table.bigIncrements('id').primary().index();

            table
                .bigInteger('tipoId')
                .index()
                .notNullable()
                .references('id')
                .inTable(ETableNames.tipos)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');
            
            table.string('subDescricao', 50).checkLength('<=', 50).index().notNullable();

            //Para o banco logico
            table.bigInteger('empresaId').index().references('id')
                .inTable(ETableNames.empresas).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('usuarioId').index().references('id')
                .inTable(ETableNames.usuarios).onUpdate('CASCADE').onDelete('RESTRICT');

            
            table.comment('Tabela usada para armazenar subtipos.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.subTipos}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.subTipos)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.subTipos}`);
        });
}
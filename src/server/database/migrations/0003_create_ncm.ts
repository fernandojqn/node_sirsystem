import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.ncm, table => {
            table.bigIncrements('id').primary().index();
            table.string('ncmNumero', 8).checkLength('=', 8).index().notNullable();
            table.string('ncmDescricao', 100).checkLength('<=', 100).index().notNullable();
            table.string('cestNumero', 7).checkLength('=', 7);

            //Para o banco logico
            table.bigInteger('empresaId').index().references('id')
                .inTable(ETableNames.empresas).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('usuarioId').index().references('id')
                .inTable(ETableNames.usuarios).onUpdate('CASCADE').onDelete('RESTRICT');

            table.comment('Tabela usada para armazenar produtos.');
            
            table.comment('Tabela usada para armazenar ncm.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.ncm}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.ncm)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.ncm}`);
        });
}
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.ncm, table => {
            table.bigIncrements('id').primary().index();
            table.string('ncmNumero', 10).checkLength('<=', 10).index().notNullable();
            table.string('descricao', 150).checkLength('<=', 150).index().notNullable();
            table.string('cestNumero', 10).checkLength('<=', 10).notNullable();
            
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
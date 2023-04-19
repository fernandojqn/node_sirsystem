
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.atividades, table => {
            table.bigIncrements('id').primary().index();
            table.string('atividade', 150).checkLength('<=', 150).index().notNullable();

            table.comment('Tabela usada para armazenar atividades.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.atividades}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.atividades)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.atividades}`);
        });
}
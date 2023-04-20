
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.subTipos, table => {
            
            table.bigIncrements('id').primary().index();

            table
                .bigInteger('idDoTipo')
                .index()
                .notNullable()
                .references('id')
                .inTable(ETableNames.tipos)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table
                .bigInteger('idDoSub')
                .index()
                .notNullable()
                .references('id')
                .inTable(ETableNames.subTipos)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');
            
            table.string('modeloDescricao', 50).checkLength('<=', 50).index().notNullable();

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
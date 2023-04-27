
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.grupos, table => {
            table.bigIncrements('id').primary().index();
            table.string('grupoDescricao', 50).checkLength('<=', 50).index().notNullable();
            table.boolean('produtoAcabado');
            table.boolean('materiaPrima');

            table
                .bigInteger('ncmId')
                .index()
                .references('id')
                .inTable(ETableNames.ncm)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table.float('comissao');

            
            table.comment('Tabela usada para armazenar grupos.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.grupos}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.grupos)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.grupos}`);
        });
}
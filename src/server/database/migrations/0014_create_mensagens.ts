import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.mensagens, table => {
            table.bigIncrements('id').primary().index();

            table.string('mensagemImpressao', 8000).checkLength('<=', 8000).index().notNullable();

            //Para o banco logico
            table.bigInteger('empresaId').index().references('id')
                .inTable(ETableNames.empresas).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('usuarioId').index().references('id')
                .inTable(ETableNames.usuarios).onUpdate('CASCADE').onDelete('RESTRICT');

                
            
            table.comment('Tabela usada para armazenar mensagens.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.mensagens}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.mensagens)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.mensagens}`);
        });
}
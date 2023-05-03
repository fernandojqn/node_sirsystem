import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.tipos, table => {
            table.bigIncrements('id').primary().index();
            table.string('tipoDescricao', 50).checkLength('<=', 50).index().notNullable();

            //Para o banco logico
            table.bigInteger('empresaId').index().references('id')
                .inTable(ETableNames.empresas).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('usuarioId').index().references('id')
                .inTable(ETableNames.usuarios).onUpdate('CASCADE').onDelete('RESTRICT');

            

            
            table.comment('Tabela usada para armazenar tipos.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.tipos}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.tipos)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.tipos}`);
        });
}
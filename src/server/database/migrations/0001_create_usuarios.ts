import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.usuarios, table => {
            
            table.bigIncrements('id').primary().index();

            table.string('nome', 50).index().checkLength('<=', 50).notNullable();
            table.string('email', 50).index().unique().checkLength('<=', 50).notNullable();
            table.string('senha').checkLength('>=', 6).notNullable();
            table.string('permissoes', 30).checkLength('<=', 30);
            table.string('departamento', 30).checkLength('<=', 30);
            table.string('telefone', 15).checkLength('<=', 15);
            table.string('celular', 15).checkLength('<=', 15);

            //Para o banco logico
            table.bigInteger('empresaId').index().references('id')
                .inTable(ETableNames.empresas).onUpdate('CASCADE').onDelete('RESTRICT');

            

            table.comment('Tabela usada para armazenar produtos.');

            table.comment('Tabela usada para armazenar usuarios.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.usuarios}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.usuarios)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.usuarios}`);
        });
}
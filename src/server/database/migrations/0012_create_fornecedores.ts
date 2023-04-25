
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.fornecedores, table => {
            table.bigIncrements('id').primary().index();
            table.string('sufixo', 50).checkLength('<=', 50).index().notNullable();
            table.string('nome', 50).checkLength('<=', 50).index().notNullable();
            table.string('tipoEmpresa', 10).checkLength('<=', 4);
            table.string('documento', 20).checkLength('<=', 20);
            table.string('inscricao', 20).checkLength('<=', 20);
            table.string('ccm', 20).checkLength('<=', 20);

            table.string('contato', 50).checkLength('<=', 50);
            table.string('telefone', 15).checkLength('<=', 15);
            table.string('celular', 15).checkLength('<=', 15);
            table.string('email', 50).checkLength('>=', 5).checkLength('<=', 50);
            table.string('site', 50).checkLength('<=', 50);

            table.string('endereco', 50).checkLength('<=', 50);
            table.string('numero', 10).checkLength('<=', 10);
            table.string('complemento', 50).checkLength('<=', 50);
            table.string('bairro', 50).checkLength('<=', 50);
            table.string('cidade', 50).checkLength('<=', 50);
            table.string('uf', 2).checkLength('<=', 2);
            table.string('cep', 10).checkLength('<=', 10);
            table.string('pais', 50).checkLength('<=', 50);
            table.string('municipio', 50).checkLength('<=', 50);

            table.boolean('cliente');

                        
            table.comment('Tabela usada para armazenar fornecedores.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.fornecedores}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.fornecedores)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.fornecedores}`);
        });
}
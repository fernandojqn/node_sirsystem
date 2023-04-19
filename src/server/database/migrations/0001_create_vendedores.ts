import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.vendedores, table => {
            table.bigIncrements('id').primary().index();
            table.string('nome', 150).checkLength('<=', 150).index().notNullable();
            table.string('tipoEmpresa', 10).checkLength('<=', 10);
            table.string('documento', 20).checkLength('<=', 20);
            table.string('inscricao', 20).checkLength('<=', 20);
            table.string('telefone', 15).checkLength('<=', 15);
            table.string('celular', 15).checkLength('<=', 15);
            table.string('email', 100).checkLength('<=', 100);

            table.string('endereco', 150).checkLength('<=', 150);
            table.string('numero', 10).checkLength('<=', 10);
            table.string('complemento', 50).checkLength('<=', 50);
            table.string('bairro', 50).checkLength('<=', 50);
            table.string('cidade', 50).checkLength('<=', 50);
            table.string('uf', 2).checkLength('<=', 2);
            table.string('cep', 10).checkLength('<=', 10);
            table.string('pais', 50).checkLength('<=', 50);
            table.string('municipio', 50).checkLength('<=', 50);

            table.double('comissao');
            table.double('irpf');
            table.string('banco', 20).checkLength('<=', 20);
            table.string('agencia', 20).checkLength('<=', 20);
            table.string('conta', 20).checkLength('<=', 20);
            table.string('pix', 50).checkLength('<=', 50);
            table.string('obs', 8000).checkLength('<=', 8000);


            table.comment('Tabela usada para armazenar vendedores.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.vendedores}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.vendedores)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.vendedores}`);
        });
}
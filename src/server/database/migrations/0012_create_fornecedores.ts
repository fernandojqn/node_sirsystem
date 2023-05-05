
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.fornecedores, table => {
            table.bigIncrements('id').primary().index();
            table.string('sufixo', 50).checkLength('<=', 50).index().notNullable();
            table.string('nome', 50).checkLength('<=', 50).index().notNullable();

            table.string('tipoEmpresa', 10).checkLength('<=', 10);
            table.string('documento', 18).checkLength('<=', 18);
            table.string('inscricaoEstadual', 14).checkLength('<=', 14);
            table.string('ccm', 12).checkLength('<=', 20);

            table.string('contato', 50).checkLength('<=', 50);
            table.string('telefone', 15).checkLength('<=', 15);
            table.string('celular', 15).checkLength('<=', 15);
            table.string('email', 50).checkLength('<=', 50);
            table.string('site', 50).checkLength('<=', 50);

            table.string('endereco', 60).checkLength('<=', 60);
            table.string('numero', 6).checkLength('<=', 6);
            table.string('complemento', 20).checkLength('<=', 20);
            table.string('bairro', 60).checkLength('<=', 60);
            table.string('cidade', 40).checkLength('<=', 40);
            table.string('uf', 2).checkLength('<=', 2);
            table.string('cep', 9).checkLength('<=', 9);
            table.string('pais', 25).checkLength('<=', 25);
            table.string('codMunicipal', 7).checkLength('<=', 7);

            table.boolean('cliente');

            table
                .bigInteger('clienteId')
                .index()
                .references('id')
                .inTable(ETableNames.clientes)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');


            //Para o banco logico
            table.bigInteger('empresaId').index().references('id')
                .inTable(ETableNames.empresas).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('usuarioId').index().references('id')
                .inTable(ETableNames.usuarios).onUpdate('CASCADE').onDelete('RESTRICT');

                                    
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
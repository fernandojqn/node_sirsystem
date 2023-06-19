import { ETableNames } from '../ETableNames';
import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pedidosVendasMensagens, table => {
            table.bigIncrements('id').primary().index();

            table.bigInteger('pedidoId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.pedidosVendas).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('mensagemId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.pedidosVendas).onUpdate('CASCADE').onDelete('RESTRICT');
            
            table.string('mensagemImpressao', 8000).checkLength('<=', 8000);
            table.string('informacoesAdicionais', 8000).checkLength('<=', 8000);
            table.string('observacoesInternas', 8000).checkLength('<=', 8000);            

            //Para o banco logico
            table.bigInteger('empresaId').index().references('id')
                .inTable(ETableNames.empresas).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('usuarioId').index().references('id')
                .inTable(ETableNames.usuarios).onUpdate('CASCADE').onDelete('RESTRICT');

            table.comment('Tabela usada para armazenar Nota Fiscal Pedidos.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.pedidosVendas}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.pedidosVendas)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.pedidosVendas}`);
        });
}
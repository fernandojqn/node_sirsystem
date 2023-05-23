
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.notaFiscalPedidos, table => {
            table.bigIncrements('id').primary().index();

            table.float('numeroPedido');
            table.date('dataEmissao');
            table.string('status', 3).checkLength('<=', 3);
            table.string('pedidoCliente', 20).checkLength('<=', 20);
            table.date('prazoEntrega');
            table.string('garantia', 20).checkLength('<=', 20);
            table.string('validadeProposta', 20).checkLength('<=', 20);

            table.bigInteger('clienteId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.clientes).onUpdate('CASCADE').onDelete('RESTRICT');
            table.string('nomeCliente', 50).checkLength('<=', 50).notNullable();

            table.string('naturezaOperacaoCFOP', 4).checkLength('<=', 4);
            table.boolean('tipoDocumento');
            table.boolean('consumoInterno');
            table.boolean('finalidadeNormal');
            table.boolean('finalidadeComplementar');
            table.boolean('finalidadeAjuste');
            table.boolean('finalidadeDevolucao');
            table.boolean('consumidorFinal');

            table.string('chaveNFeDevolucao1', 22).checkLength('<=', 22);
            table.string('chaveNFeDevolucao2', 22).checkLength('<=', 22);
            table.string('chaveNFeDevolucao3', 22).checkLength('<=', 22);
            table.string('chaveNFeDevolucao4', 22).checkLength('<=', 22);

            
            table.date('dataLiberacao');
            table.float('totalNota');
            table.date('dataFaturamento');
            table.string('nfe', 30).checkLength('<=', 30);
            table.string('chaveNFe', 30).checkLength('<=', 30);
            table.string('protocolo', 30).checkLength('<=', 30);

            //Para o banco logico
            table.bigInteger('empresaId').index().references('id')
                .inTable(ETableNames.empresas).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('usuarioId').index().references('id')
                .inTable(ETableNames.usuarios).onUpdate('CASCADE').onDelete('RESTRICT');

            table.comment('Tabela usada para armazenar Nota Fiscal Pedidos.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.notaFiscalPedidos}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.notaFiscalPedidos)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.notaFiscalPedidos}`);
        });
}
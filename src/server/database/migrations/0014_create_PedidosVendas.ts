import { ETableNames } from '../ETableNames';
import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pedidosVendas, table => {
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
                
            table.string('sufixo', 50).checkLength('<=', 50);
            table.string('contato', 50).checkLength('<=', 50);
            table.string('telefone', 15).checkLength('<=', 15);
            table.string('celular', 15).checkLength('<=', 15);

            table.string('naturezaOperacaoCFOP', 4).checkLength('<=', 4);
            table.boolean('tipoDocumento');
            table.boolean('consumoInterno');
            table.boolean('finalidadeNormal');
            table.boolean('finalidadeComplementar');
            table.boolean('finalidadeAjuste');
            table.boolean('finalidadeDevolucao');
            table.boolean('consumidorFinal');

            table.string('chaveNFeDevolucao1', 44).checkLength('<=', 44);
            table.string('chaveNFeDevolucao2', 44).checkLength('<=', 44);
            table.string('chaveNFeDevolucao3', 44).checkLength('<=', 44);
            table.string('chaveNFeDevolucao4', 44).checkLength('<=', 44);
            
            table.date('dataLiberacao');
            table.float('totalNota');
            table.date('dataFaturamento');
            table.float('nfe');
            table.float('chaveNFe');
            table.string('protocolo', 15).checkLength('<=', 15);

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
import { ETableNames } from '../ETableNames';
import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pedidosVendasPagamentos, table => {
            table.bigIncrements('id').primary().index();

            table.bigInteger('pedidoId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.pedidosVendas).onUpdate('CASCADE').onDelete('RESTRICT');
                
            table.boolean('vistaPrazo');
            table.date('dataVencimento');
            table.string('descricaoVista', 200).checkLength('<=', 200);

            table.float('vencimento1');
            table.float('vencimento2');
            table.float('vencimento3');
            table.float('vencimento4');
            table.float('vencimento5');
            table.float('vencimento6');
            table.float('vencimento7');
            table.float('vencimento8');
            table.float('vencimento9');
            table.float('vencimento10');
            table.float('vencimento11');
            table.float('vencimento12');

            table.string('tipoPagamento', 30).checkLength('<=', 30);

            table.boolean('comissaoValor');
            table.float('comissao');
            table.float('valor');
            
            table.bigInteger('vendedorId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.vendedores).onUpdate('CASCADE').onDelete('RESTRICT');

            //Para o banco logico
            table.bigInteger('empresaId').index().references('id')
                .inTable(ETableNames.empresas).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('usuarioId').index().references('id')
                .inTable(ETableNames.usuarios).onUpdate('CASCADE').onDelete('RESTRICT');

            table.comment('Tabela usada para armazenar Nota Fiscal Pedidos.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.pedidosVendasPagamentos}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.pedidosVendasPagamentos)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.pedidosVendasPagamentos}`);
        });
}
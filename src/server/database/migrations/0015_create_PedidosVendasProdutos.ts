import { ETableNames } from '../ETableNames';
import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pedidosVendasProdutos, table => {
            table.bigIncrements('id').primary().index();

            table.bigInteger('pedidoId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.pedidosVendas).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('produtoId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.produtos).onUpdate('CASCADE').onDelete('RESTRICT');

            table.string('codigoProduto', 13).checkLength('<=', 13);
            table.string('produto', 50).checkLength('<=', 50);

            table.float('numeroItem');
            table.boolean('embalagemUnidade');
            table.float('quantidade');
            
            table.float('quantidadeEmbalagem');
            table.string('unidade', 3).checkLength('<=', 3);
            table.string('condicao', 20).checkLength('<=', 20);
            table.float('precoUnitario');
            table.float('precoItem');
            table.float('desconto');
            table.float('subTotal');
            table.float('frete');
            table.float('seguro');
            table.float('totalItem');
            table.boolean('compoemValorTotal');

            table.string('pedidoCompra', 50).checkLength('<=', 50);
            table.string('pedidoCompraItem', 50).checkLength('<=', 50);
            table.string('localEstoque', 50).checkLength('<=', 50);

            

            //Para o banco logico
            table.bigInteger('empresaId').index().references('id')
                .inTable(ETableNames.empresas).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('usuarioId').index().references('id')
                .inTable(ETableNames.usuarios).onUpdate('CASCADE').onDelete('RESTRICT');

            table.comment('Tabela usada para armazenar Nota Fiscal Pedidos.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.pedidosVendasProdutos}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.pedidosVendasProdutos)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.pedidosVendasProdutos}`);
        });
}
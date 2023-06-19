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

            // Impostos //
            table.bigInteger('regraTributacaoId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.tributacoes).onUpdate('CASCADE').onDelete('RESTRICT');

            table.string('cst', 3).checkLength('<=', 3);
            table.string('cfop', 4).checkLength('<=', 4);
            table.string('cest', 7).checkLength('<=', 7);
            table.string('ncm', 8).checkLength('<=', 8);
            //ICMS
            table.string('icmsSituacaoTributaria', 3).checkLength('<=', 3);
            table.string('icmsOrigem', 3).checkLength('<=', 3);
            table.float('icmsBaseReducao');
            table.float('icmsReducao');
            table.float('icmsBaseCalculo');
            table.float('icmsAliquota');
            table.float('icmsValor');
            table.float('icmsOperacao');
            table.float('icmsDiferencial');
            table.float('icmsDiferido');
            //ICMS ST
            table.float('icmsSTReducao');
            table.float('icmsSTValor');
            table.float('icmsSTmva');
            table.float('icmsSTmvaValor');
            table.float('icmsSTAliquota');
            table.float('icmsSTAliquotaValor');
            table.string('icmsSTuf', 2).checkLength('<=', 2);
            //FCP
            table.float('fcpBase');
            table.float('fcpAliquota');
            table.float('fcpValor');
            // IPI
            table.string('ipiSituacaoTributaria', 3).checkLength('<=', 3);
            table.float('ipiBase');
            table.float('ipiAliquota');
            table.float('ipiValor');
            //Cofins
            table.string('cofinsSituacaoTribunal', 3).checkLength('<=', 3);
            table.float('cofinsBase');
            table.float('cofinsAliquota');
            table.float('cofinsValor');
            //PIS
            table.string('pisSituacaoTribunal', 3).checkLength('<=', 3);
            table.float('pisBase');
            table.float('pisAliquota');
            table.float('pisValor');
            //ICMS-Estadual
            table.float('icmsRelativo');
            table.float('baseCalculo');
            table.float('baseCalculoFCP');
            table.float('internaUFdestino');
            table.float('interestadual');
            table.float('provisoriaPartilha');
            table.float('icmsDestino');
            table.float('icmsRemetente');
            table.float('icmsFCPdestino');

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
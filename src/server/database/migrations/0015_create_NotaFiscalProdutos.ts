
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.notaFiscalProdutos, table => {
            table.bigIncrements('id').primary().index();

            table.bigInteger('pedidoId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.notaFiscalPedidos).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('produtoId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.produtos).onUpdate('CASCADE').onDelete('RESTRICT');
            
            table.float('numeroItem');
            table.boolean('embalagemUnidade');
            table.float('quantidade');
            table.float('quantidadeEmbalagem');
            table.string('tipoEmbalagem', 3).checkLength('<=', 3);
            table.float('unidade');
            table.float('precoUnitario');
            table.float('precoItem');
            table.float('desconto');
            table.float('subTotal');
            table.float('frete');
            table.float('seguro');
            table.float('totalItem');
            table.boolean('compoemValorTotal');

            table.string('pedidoCompra', 30).checkLength('<=', 30);
            table.string('pedidoCompraItem', 15).checkLength('<=', 15);
            table.string('localEstoque', 30).checkLength('<=', 30);
            table.string('pedidoCliente', 30).checkLength('<=', 30);
            table.string('pedidoNFe', 30).checkLength('<=', 30);

            table.bigInteger('regraTributacaoId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.tributacoes).onUpdate('CASCADE').onDelete('RESTRICT');

            table.string('cst', 3).checkLength('<=', 3);
            table.string('cfop', 4).checkLength('<=', 4);
            table.string('cest', 7).checkLength('<=', 7);
            table.string('ncm', 8).checkLength('<=', 8);

            table.string('situacaoTributariaICMS', 3).checkLength('<=', 3);
            table.string('origemICMS', 3).checkLength('<=', 3);
            table.float('baseReducaoICMS');
            table.float('reducaoICMS');
            table.float('baseCalculoICMS');
            table.float('aliquotaICMS');
            table.float('valorICMS');
            table.float('operacaoICMS');
            table.float('diferencaICMS');
            table.float('diferidoICMS');

            table.float('reducaoICMSst');
            table.float('valorICMSst');
            table.float('mvaICMSst');
            table.float('MVAvalorICMSst');
            table.float('aliquotaICMSst');
            table.float('icmsST');
            table.string('ufICMSst', 2). checkLength('<=', 2);

            table.float('baseICMSfcp');
            table.float('aliquotaICMSfcp');
            table.float('icmsFCP');

            table.string('situacaoTributariaIPI', 3).checkLength('<=', 3);
            table.float('baseCalculoIPI');
            table.float('aliquotaIPI');
            table.float('valorIPI');

            table.string('situacaoTributariaCOFINS', 3).checkLength('<=', 3);
            table.float('baseCalculoCOFINS');
            table.float('aliquotaCOFINS');
            table.float('valorCOFINS');

            table.string('situacaoTributariaPIS', 3).checkLength('<=', 3);
            table.float('baseCalculoPIS');
            table.float('aliquotaPIS');
            table.float('valorPIS');

            table.float('porcentagemICMSrelativoFCPufDestino');
            table.float('valorBaseCalculoUFDestino');
            table.float('valorBaseCalculoFCPnaUF');
            table.float('internaUFdestino');
            table.float('interestadual');
            table.float('provisoriaPartilha');
            table.float('icmsPartilhaUFdestino');
            table.float('icmsPartilhaUFremetente');
            table.float('icmsRelativoFCPufDestino');

            //Para o banco logico
            table.bigInteger('empresaId').index().references('id')
                .inTable(ETableNames.empresas).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('usuarioId').index().references('id')
                .inTable(ETableNames.usuarios).onUpdate('CASCADE').onDelete('RESTRICT');

            table.comment('Tabela usada para armazenar Nota Fiscal Produtos.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.notaFiscalProdutos}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.notaFiscalProdutos)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.notaFiscalProdutos}`);
        });
}
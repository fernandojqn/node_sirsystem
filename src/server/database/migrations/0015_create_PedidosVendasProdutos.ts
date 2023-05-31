import { ETableNames } from '../ETableNames';
import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pedidosVendasProdutos, table => {
            table.bigIncrements('id').primary().index();

            table.float('pedidoId');
            table.float('produtoId');
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

            table.string('pedidoCompra', 50).checkLength('<=', 50);
            table.string('pedidoCompraItem', 50).checkLength('<=', 50);
            table.string('localEstoque', 50).checkLength('<=', 50);
            table.string('pedidoCliente', 50).checkLength('<=', 50);
            table.string('pedidoNFe', 50).checkLength('<=', 50);

            table.float('regraTributacaoId');
            table.string('cst', 3).checkLength('<=', 3);
            table.string('cfop', 4).checkLength('<=', 4);
            table.string('cest', 7).checkLength('<=', 7);
            table.string('ncm', 8).checkLength('<=', 8);

            //////Impostos//////
            //icms
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
            //ICMS ST
            table.float('reducaoICMSst');
            table.float('valorICMSst');
            table.float('mvaICMSst');
            table.float('MVAvalorICMSst');
            table.float('aliquotaICMSst');
            table.float('icmsST');
            table.string('ufICMSst', 2).checkLength('<=', 2);
            //FCP
            table.float('baseICMSfcp');
            table.float('aliquotaICMSfcp');
            table.float('icmsFCP');
            //IPI
            table.string('situacaoTributariaIPI', 2).checkLength('<=', 2);
            table.float('baseCalculoIPI');
            table.float('aliquotaIPI');
            table.float('valorIPI');
            //COFINS
            table.string('situacaoTributariaCOFINS', 2).checkLength('<=', 2);
            table.float('baseCalculoCOFINS');
            table.float('aliquotaCOFINS');
            table.float('valorCOFINS');
            //PIS
            table.string('situacaoTributariaPIS', 2).checkLength('<=', 2);
            table.float('baseCalculoPIS');
            table.float('aliquotaPIS');
            table.float('valorPIS');
            //ICMS-Estadual
            table.float('porcentagemICMSrelativoFCPufDestino');
            table.float('valorBaseCalculoUFDestino');
            table.float('valorBaseCalculoFCPnaUF');
            table.float('internaUFdestino');
            table.float('');
            table.float('');
            table.float('');
            table.float('');
            table.float('');

    ?: number;
    ?: number;
    ?: number;
    ?: number;
    ?: number;
    provisoriaPartilha?: number;
    icmsPartilhaUFdestino?: number;
    icmsPartilhaUFremetente?: number;
    icmsRelativoFCPufDestino?: number;

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
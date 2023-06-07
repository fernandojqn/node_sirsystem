import { ETableNames } from '../ETableNames';
import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pedidosVendasTotais, table => {
            table.bigIncrements('id').primary().index();

            table.bigInteger('pedidoId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.pedidosVendas).onUpdate('CASCADE').onDelete('RESTRICT');    
    
            table.float('totalProdutosServicos');
            table.float('baseCalculo1');
            table.float('baseCalculo2');
            table.float('icmsFCP');
            table.float('icmsPartilhaRemetente');
            table.float('icmsFCPufDestino');
            table.float('totalIPI');
            table.float('devolvidoIPI');
            table.float('baseCalculoICMSst1');
            table.float('baseCalculoICMSst2');
            table.float('icmsFCPst');
            table.float('icmsSTpartilhaDestinatario');
            table.float('icmsSTdesonerado');
            table.float('totalCOFINS');
            table.float('totalPIS');
            table.float('totalFrete');
            table.float('totalDesconto');
            table.float('totalSeguro');
            table.float('totalOutros');
            table.float('totalNota');
            
            table.boolean('vistaprazo');
            table.date('dataVencimento');
            table.string('descricaoAvista', 250).checkLength('<=', 250);
            table.float('prazoDias1');
            table.float('prazoDias2');
            table.float('prazoDias3');
            table.float('prazoDias4');
            table.float('prazoDias5');
            table.float('prazoDias6');
            table.float('prazoDias7');
            table.float('prazoDias8');
            table.float('prazoDias9');
            table.float('prazoDias10');
            table.float('prazoDias11');
            table.float('prazoDias12');
            table.string('tipoDePagamento', 20).checkLength('<=', 20);
            
            table.boolean('comissaoValor');
            table.float('comissao');
            table.float('valor');
            
            table.bigInteger('vendedorId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.vendedores).onUpdate('CASCADE').onDelete('RESTRICT'); 

            table.bigInteger('transportadoraId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.transportadoras).onUpdate('CASCADE').onDelete('RESTRICT'); 
            
            table.string('modalidadeFrete', 1).checkLength('<=', 1);
            table.float('valorTotalFrete');
            
            table.float('pesoEmbalagem');
            table.string('numeroEmbalagem', 50).checkLength('<=', 50);
            table.float('quantidadeEmbalagem');
            table.string('especieEmbalagem', 50).checkLength('<=', 50);
            table.float('pesoLiquidoEmbalagem');
            table.float('pesoBrutoEmbalagem');
            table.string('marca', 50).checkLength('<=', 50);

            table.bigInteger('codigoMensagemId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.transportadoras).onUpdate('CASCADE').onDelete('RESTRICT'); 

            table.string('impressaoPedido', 8000).checkLength('<=',8000);
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
            console.log(`# Created table ${ETableNames.pedidosVendasTotais}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.pedidosVendasTotais)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.pedidosVendasTotais}`);
        });
}
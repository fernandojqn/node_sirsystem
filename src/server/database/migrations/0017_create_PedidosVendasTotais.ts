import { ETableNames } from '../ETableNames';
import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pedidosVendasTotais, table => {
            table.bigIncrements('id').primary().index();

            table.bigInteger('pedidoId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.pedidosVendas).onUpdate('CASCADE').onDelete('RESTRICT');    
    
            table.float('totalTributos');
            table.float('baseCalculo');
            table.float('totalICMS');
            table.float('baseCalculoICMSst');
            table.float('totalICMSst');
            table.float('totalProdutosServicos');
            table.float('totalFrete');
            table.float('icmsPartilhaRemetente');
            table.float('icmsPartilhaDestinatario');
            table.float('total2');
            table.float('totalIPI');
            table.float('totalPIS');
            table.float('totalCOFINS');
            table.float('totalSeguro');
            table.float('totalDesconto');
            table.float('outrasDespesas');
            table.float('icmsDesonerado');
            table.float('totalICMSfcp');
            table.float('totalICMSstFCP');
            table.float('totalICMSstFCPretido');
            table.float('totalIPIdevolvido');
            table.float('totalICMSfcpUFdestino');
            table.float('pisST');
            table.float('cofinsST');
            table.float('totalNota');

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
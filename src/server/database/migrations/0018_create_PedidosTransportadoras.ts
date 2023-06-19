import { ETableNames } from '../ETableNames';
import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pedidosVendasTransportadoras, table => {
            table.bigIncrements('id').primary().index();

            table.bigInteger('pedidoId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.pedidosVendas).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('transportadoraId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.transportadoras).onUpdate('CASCADE').onDelete('RESTRICT');
            
            table.string('modalidadeFrete', 30).checkLength('<=', 30);
            table.float('valorFrete');

            table.float('pesoEmbalagem');
            table.float('numeroCaixa');
            table.float('quantidade');
            table.string('especie', 50).checkLength('<=', 50);
            table.float('pesoLiquido');
            table.float('pesoBruto');
            table.string('marca', 50).checkLength('<=', 50);

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
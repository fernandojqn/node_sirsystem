
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.tributacoes, table => {
            table.bigIncrements('id').primary().index();
            table.string('regra', 50).checkLength('<=', 50).index().notNullable().unique();
            table.string('cfop', 4).checkLength('=', 4);
            table.string('cst', 3).checkLength('=', 3);

            table
                .bigInteger('ncmId')
                .index()
                .references('id')
                .inTable(ETableNames.ncm)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table.string('uf', 2).checkLength('=', 2);
            table.float('icms');
            table.float('ipi');
            table.float('pis');
            table.float('cofins');
            table.float('csll');
            table.float('irrf');
            table.float('inss');
            table.float('iss');
            table.float('anp');
            table.float('ibpt');



            table.comment('Tabela usada para armazenar tributacoes.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.tributacoes}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.tributacoes)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.tributacoes}`);
        });
}
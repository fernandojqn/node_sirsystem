
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.clientes, table => {
            table.bigIncrements('id').primary().index();
            table.string('sufixo', 50).checkLength('<=', 50).index().notNullable();
            table.string('nome', 50).checkLength('<=', 50).index().notNullable();
            table.string('tipoEmpresa', 4).checkLength('<=', 4);
            table.string('documento', 18).checkLength('<=', 18);
            table.string('inscricaoEstadual', 14).checkLength('<=', 14);
            table.string('ccm', 12).checkLength('<=', 12);

            table.string('contato', 50).checkLength('<=', 50);
            table.string('telefone', 15).checkLength('<=', 15);
            table.string('celular', 15).checkLength('<=', 15);
            table.string('email', 50).checkLength('<=', 50);
            table.string('site', 50).checkLength('<=', 50);

            table.string('endereco', 60).checkLength('<=', 60);
            table.string('numero', 6).checkLength('<=', 6);
            table.string('complemento', 20).checkLength('<=', 20);
            table.string('bairro', 60).checkLength('<=', 60);
            table.string('cidade', 40).checkLength('<=', 40);
            table.string('uf', 2).checkLength('<=', 2);
            table.string('cep', 9).checkLength('<=', 9);
            table.string('pais', 25).checkLength('<=', 25);
            table.string('codMunicipal', 7).checkLength('<=', 7);

            table.string('enderecoEnt', 60).checkLength('<=', 60);
            table.string('numeroEnt', 6).checkLength('<=', 6);
            table.string('complementoEnt', 20).checkLength('<=', 20);
            table.string('bairroEnt', 60).checkLength('<=', 60);
            table.string('cidadeEnt', 40).checkLength('<=', 40);
            table.string('ufEnt', 2).checkLength('<=', 2);
            table.string('cepEnt', 9).checkLength('<=', 9);
            table.string('paisEnt', 25).checkLength('<=', 25);
            table.string('codMunicipalEnt', 7).checkLength('<=', 7);

            table.string('enderecoCor', 60).checkLength('<=', 60);
            table.string('numeroCor', 6).checkLength('<=', 6);
            table.string('complementoCor', 20).checkLength('<=', 20);
            table.string('bairroCor', 60).checkLength('<=', 60);
            table.string('cidadeCor', 40).checkLength('<=', 40);
            table.string('ufCor', 2).checkLength('<=', 2);
            table.string('cepCor', 9).checkLength('<=', 9);
            table.string('paisCor', 25).checkLength('<=', 25);
            table.string('codMunicipalCor', 7).checkLength('<=', 7);

            table.string('pagamento1', 20).checkLength('<=', 20);
            table.string('pagamento2', 20).checkLength('<=', 20);
            table.string('pagamento3', 20).checkLength('<=', 20);
            table.string('pagamento4', 20).checkLength('<=', 20);
            table.string('pagamento5', 20).checkLength('<=', 20);
            table.string('pagamento6', 20).checkLength('<=', 20);
            table.float('desconto1');
            table.float('desconto2');
            table.float('desconto3');
            table.string('obs', 8000).checkLength('<=', 8000);

            table
                .bigInteger('atividadeId')
                .index()
                .references('id')
                .inTable(ETableNames.atividades)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table
                .bigInteger('vendedorId')
                .index()
                .references('id')
                .inTable(ETableNames.vendedores)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table.float('cofins');
            table.float('pis');
            table.float('icms');
            table.float('ipi');
            table.boolean('simplesNascional');
            table.boolean('retemISS');

            table.comment('Tabela usada para armazenar clientes.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.clientes}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.clientes)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.clientes}`);
        });
}
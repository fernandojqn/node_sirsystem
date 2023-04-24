
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.clientes, table => {
            table.bigIncrements('id').primary().index();
            table.string('sufixo', 50).checkLength('<=', 50).index().notNullable();
            table.string('nome', 50).checkLength('<=', 50).index().notNullable();
            table.string('tipoEmpresa', 10).checkLength('<=', 10);
            table.string('documento', 20).checkLength('<=', 20);
            table.string('inscricao', 20).checkLength('<=', 20);
            table.string('ccm', 20).checkLength('<=', 20);

            table.string('contato', 50).checkLength('<=', 50);
            table.string('telefone', 15).checkLength('<=', 15);
            table.string('celular', 15).checkLength('<=', 15);
            table.string('email', 50).checkLength('>=', 5).checkLength('<=', 50);
            table.string('site', 50).checkLength('<=', 50);

            table.string('endereco', 100).checkLength('<=', 100);
            table.string('numero', 10).checkLength('<=', 10);
            table.string('complemento', 50).checkLength('<=', 50);
            table.string('bairro', 50).checkLength('<=', 50);
            table.string('cidade', 50).checkLength('<=', 50);
            table.string('uf', 2).checkLength('<=', 2);
            table.string('cep', 10).checkLength('<=', 10);
            table.string('pais', 50).checkLength('<=', 50);
            table.string('municipio', 50).checkLength('<=', 50);

            table.string('enderecoEnt', 100).checkLength('<=', 100);
            table.string('numeroEnt', 10).checkLength('<=', 10);
            table.string('complementoEnt', 50).checkLength('<=', 50);
            table.string('bairroEnt', 50).checkLength('<=', 50);
            table.string('cidadeEnt', 50).checkLength('<=', 50);
            table.string('ufEnt', 2).checkLength('<=', 2);
            table.string('cepEnt', 10).checkLength('<=', 10);
            table.string('paisEnt', 50).checkLength('<=', 50);
            table.string('municipioEnt', 50).checkLength('<=', 50);

            table.string('enderecoCor', 100).checkLength('<=', 100);
            table.string('numeroCor', 10).checkLength('<=', 10);
            table.string('complementoCor', 50).checkLength('<=', 50);
            table.string('bairroCor', 50).checkLength('<=', 50);
            table.string('cidadeCor', 50).checkLength('<=', 50);
            table.string('ufCor', 2).checkLength('<=', 2);
            table.string('cepCor', 10).checkLength('<=', 10);
            table.string('paisCor', 50).checkLength('<=', 50);
            table.string('municipioCor', 50).checkLength('<=', 50);

            table.string('pagamento1', 20).checkLength('<=', 20);
            table.string('pagamento2', 20).checkLength('<=', 20);
            table.string('pagamento3', 20).checkLength('<=', 20);
            table.string('pagamento4', 20).checkLength('<=', 20);
            table.string('pagamento5', 20).checkLength('<=', 20);
            table.string('pagamento6', 20).checkLength('<=', 20);
            table.string('desconto1', 20).checkLength('<=', 20);
            table.string('desconto2', 20).checkLength('<=', 20);
            table.string('desconto3', 20).checkLength('<=', 20);
            table.string('obs', 20).checkLength('<=', 20);

            table
                .bigInteger('atividade')
                .index()
                .references('id')
                .inTable(ETableNames.atividades)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table
                .bigInteger('vendedor')
                .index()
                .references('id')
                .inTable(ETableNames.vendedores)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table.double('cofins');
            table.double('pis');
            table.double('icms');
            table.double('ipi');
            table.string('simplesNascional', 20).checkLength('<=', 20);
            table.string('retemISS', 20).checkLength('<=', 20);

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
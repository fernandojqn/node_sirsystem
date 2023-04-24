import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.empresas, table => {
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

            table.string('unidade', 50).checkLength('<=', 50);
            table.string('nomeUnidade', 50).checkLength('<=', 50);
            table.string('modeloCF', 50).checkLength('<=', 50);
            table.string('numSerie', 50).checkLength('<=', 50);
            table.string('obs', 50).checkLength('<=', 50);
            table.string('obsFisco', 50).checkLength('<=', 50);


            table.string('codigoNatureza', 50).checkLength('<=', 50);
            table.string('modeloNF', 50).checkLength('<=', 50);
            table.string('serie', 50).checkLength('<=', 50);
            table.boolean('optanteSN');
            table.double('aliqICMS');
            table.double('aliqCOFINS');
            table.double('aliqPIS');
            table.string('perfil', 1).checkLength('=', 1);

            table.string('tipoRegime', 50).checkLength('<=', 50);
            table.string('criterioEscritura', 50).checkLength('<=', 50);
            table.string('apropriacaoCredito', 50).checkLength('<=', 50);
            table.string('tipoContribuicao', 50).checkLength('<=', 50);
            table.string('codigoEstrutura', 50).checkLength('<=', 50);
            table.string('codigoOperacao', 50).checkLength('<=', 50);

            table.comment('Tabela usada para armazenar empresas.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.empresas}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.empresas)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.empresas}`);
        });
}
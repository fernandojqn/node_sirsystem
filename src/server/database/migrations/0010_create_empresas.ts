import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.empresas, table => {
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
            table.string('codMunicipio', 7).checkLength('=', 7);

            table.string('modeloCF', 2).checkLength('<=', 2);
            table.string('serieCF', 2).checkLength('<=', 2);
            table.string('numSerie', 60).checkLength('<=', 60);
            table.string('obs', 8000).checkLength('<=', 8000);
            table.string('obsFisco', 8000).checkLength('<=', 8000);

            table.string('codigoNatureza', 1).checkLength('<=', 1);
            table.string('modeloNF', 2).checkLength('<=', 2);
            table.string('serie', 2).checkLength('<=', 2);

            table.boolean('optanteSN');
            table.float('aliquotaICMS');
            table.float('aliquotaCOFINS');
            table.float('aliquotaPIS');
            table.string('perfil', 1).checkLength('=', 1);

            table.string('tipoRegime', 1).checkLength('<=', 1);
            table.string('criterioEscritura', 1).checkLength('<=', 1);
            table.string('apropriacaoCredito', 1).checkLength('<=', 1);
            table.string('tipoContribuicao', 1).checkLength('<=', 1);
            table.string('codigoEstrutura', 1).checkLength('<=', 1);
            table.string('codigoOperacao', 1).checkLength('<=', 1);            

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

import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.produtos, table => {
            table.bigIncrements('id').primary().index();

            table.string('produto', 50).checkLength('<=', 50).index().notNullable();
            table.string('codigoProduto', 13).checkLength('<=', 13).index().notNullable().unique();
            table.string('ean', 13).checkLength('<=', 13).index().notNullable().unique();

            table.bigInteger('grupoId').index().references('id')
                .inTable(ETableNames.grupos).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('tipoId').index().references('id')
                .inTable(ETableNames.tipos).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('subId').index().references('id')
                .inTable(ETableNames.subTipos).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('modeloId').index().references('id')
                .inTable(ETableNames.modelos).onUpdate('CASCADE').onDelete('RESTRICT');

            table.string('descricaoDetalhada', 100).checkLength('<=', 100);
            table.string('origem', 1).checkLength('<=', 1);
            table.string('cfop', 4).checkLength('<=', 4);
            table.string('cstVendas', 3).checkLength('<=', 3);
            table.string('escrituracao', 2).checkLength('<=', 2);
            
            table.bigInteger('ncmId').index().references('id')
                .inTable(ETableNames.ncm).onUpdate('CASCADE').onDelete('RESTRICT');

            table.string('embalagem', 3).checkLength('<=', 3);
            table.float('quantidadeEmbalagem');
            table.string('unidade', 2).checkLength('<=', 2);
            table.float('liquido');
            table.float('bruto');

            table.bigInteger('fornecedor1Id').index().references('id')
                .inTable(ETableNames.fornecedores).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('fornecedor2Id').index().references('id')
                .inTable(ETableNames.fornecedores).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('fornecedor3Id').index().references('id')
                .inTable(ETableNames.fornecedores).onUpdate('CASCADE').onDelete('RESTRICT');

            table.string('codigoFabricante', 20).checkLength('<=', 20);
            table.string('dataUltimaCompra', 10).checkLength('<=', 10);
            table.string('nfe', 9).checkLength('<=', 9);

            table.boolean('produtoAtivo');
            table.boolean('produtoAcabado');
            table.boolean('proprio');
            table.boolean('terceiros');
            table.boolean('receita');
            table.boolean('paraVenda');
            table.boolean('paraCompra');
            table.boolean('outro');
            table.string('descricaoOutro', 20).checkLength('<=', 20);

            table.boolean('promocao');
            table.string('moeda', 3).checkLength('<=', 3);
            table.float('precoCusto');
            table.float('capagem');
            table.float('precoCompra');

            table.float('margemLucro1');
            table.float('margemLucro2');
            table.float('margemLucro3');
            table.float('margemLucro4');
            table.float('margemLucro5');
            table.string('condicao1', 20).checkLength('<=', 20);
            table.string('condicao2', 20).checkLength('<=', 20);
            table.string('condicao3', 20).checkLength('<=', 20);
            table.string('condicao4', 20).checkLength('<=', 20);
            table.string('condicao5', 20).checkLength('<=', 20);
            table.float('precoVenda1');
            table.float('precoVenda2');
            table.float('precoVenda3');
            table.float('precoVenda4');
            table.float('precoVenda5');

            table.float('ipiCompra');
            table.float('ipiVenda');
            table.float('icmsCompra');
            table.float('icmsVenda');
            table.float('pis');
            table.float('cofins');
            table.boolean('baseCalculoReduzida');
            table.float('porcentagemReducao');
            table.boolean('comissaoDiferenciada');
            table.float('porcentagemComissao');

            //Para o banco logico
            table.bigInteger('empresaId').index().references('id')
                .inTable(ETableNames.empresas).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('usuarioId').index().references('id')
                .inTable(ETableNames.usuarios).onUpdate('CASCADE').onDelete('RESTRICT');

            table.comment('Tabela usada para armazenar produtos.');
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.produtos}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.produtos)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.produtos}`);
        });
}
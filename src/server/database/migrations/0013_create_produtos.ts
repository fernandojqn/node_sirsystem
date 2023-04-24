
import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.produtos, table => {
            table.bigIncrements('id').primary().index();

            table.string('produto', 50).checkLength('<=', 50).index().notNullable();
            table.string('codigoProduto', 50).checkLength('<=', 50).index().notNullable();
            table.string('ean', 10).checkLength('<=', 10);

            table.bigInteger('grupo').index().references('id')
                .inTable(ETableNames.grupos).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('tipo').index().references('id')
                .inTable(ETableNames.tipos).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('sub').index().references('id')
                .inTable(ETableNames.subTipos).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('modelo').index().references('id')
                .inTable(ETableNames.modelos).onUpdate('CASCADE').onDelete('RESTRICT');

            table.string('descricaoDetalhada', 150).checkLength('<=', 150);

            table.string('origem', 20).checkLength('<=', 20);
            table.string('cfop', 20).checkLength('<=', 20);
            table.string('cstVendas', 20).checkLength('<=', 20);
            table.string('escrituracao', 50).checkLength('<=', 50);
            
            table.bigInteger('ncm').index().references('id')
                .inTable(ETableNames.ncm).onUpdate('CASCADE').onDelete('RESTRICT');

            table.string('embalagem', 15).checkLength('<=', 15);
            table.string('quantidadeEmbalagem', 50).checkLength('>=', 5).checkLength('<=', 50);
            table.string('unidade', 50).checkLength('<=', 50);
            table.string('liquido', 100).checkLength('<=', 100);
            table.string('bruto', 10).checkLength('<=', 10);

            table.bigInteger('fornecedor1').index().references('id')
                .inTable(ETableNames.fornecedores).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('fornecedor2').index().references('id')
                .inTable(ETableNames.fornecedores).onUpdate('CASCADE').onDelete('RESTRICT');

            table.bigInteger('fornecedor3').index().references('id')
                .inTable(ETableNames.fornecedores).onUpdate('CASCADE').onDelete('RESTRICT');

            table.string('codigoFabricante', 50).checkLength('<=', 50);
            table.string('dataUltimaCompra', 50).checkLength('<=', 50);
            table.string('nfe', 50).checkLength('<=', 50);

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
            table.string('moeda', 10).checkLength('<=', 10);
            table.double('precoCusto');
            table.double('capagem');
            table.double('precoCompra');

            table.string('margemLucro1', 20).checkLength('<=', 20);
            table.string('margemLucro2', 20).checkLength('<=', 20);
            table.string('margemLucro3', 20).checkLength('<=', 20);
            table.string('margemLucro4', 20).checkLength('<=', 20);
            table.string('margemLucro5', 20).checkLength('<=', 20);
            table.string('condicao1', 20).checkLength('<=', 20);
            table.string('condicao2', 20).checkLength('<=', 20);
            table.string('condicao3', 20).checkLength('<=', 20);
            table.string('condicao4', 20).checkLength('<=', 20);
            table.string('condicao5', 20).checkLength('<=', 20);
            table.string('precoVenda1', 20).checkLength('<=', 20);
            table.string('precoVenda2', 20).checkLength('<=', 20);
            table.string('precoVenda3', 20).checkLength('<=', 20);
            table.string('precoVenda4', 20).checkLength('<=', 20);
            table.string('precoVenda5', 20).checkLength('<=', 20);

            table.double('ipiCompra');
            table.double('ipiVenda');
            table.double('icmsCompra');
            table.double('icmsVenda');
            table.double('pis');
            table.double('cofins');
            table.boolean('baseCalculoReduzida');
            table.double('porcentagemReducao');
            table.double('comissaoDiferenciada');
            table.double('porcentagemComissao');
            

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
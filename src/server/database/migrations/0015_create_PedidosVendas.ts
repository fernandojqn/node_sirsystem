import { ETableNames } from '../ETableNames';
import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pedidosVendas, table => {
            table.bigIncrements('id').primary().index();
            table.float('pedidoId');

            //Pedido
            table.date('dataEmissao');
            table.string('status', 3).checkLength('<=', 3);
            table.string('pedidoCliente', 20).checkLength('<=', 20);
            table.string('prazoEntrega', 20).checkLength('<=', 20);
            table.string('garantia', 20).checkLength('<=', 20);
            table.string('validadeProposta', 20).checkLength('<=', 20);

            table.bigInteger('clienteId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.clientes).onUpdate('CASCADE').onDelete('RESTRICT');
                
            table.string('sufixo', 50).checkLength('<=', 50);
            table.string('contato', 50).checkLength('<=', 50);
            table.string('telefone', 15).checkLength('<=', 15);
            table.string('celular', 15).checkLength('<=', 15);

            table.string('naturezaOperacaoCFOP', 4).checkLength('<=', 4);
            table.boolean('tipoDocumento');
            table.boolean('consumoInterno');
            table.boolean('finalidadeNormal');
            table.boolean('finalidadeComplementar');
            table.boolean('finalidadeAjuste');
            table.boolean('finalidadeDevolucao');
            table.boolean('consumidorFinal');

            table.string('chaveNFeDevolucao1', 44).checkLength('<=', 44);
            table.string('chaveNFeDevolucao2', 44).checkLength('<=', 44);
            table.string('chaveNFeDevolucao3', 44).checkLength('<=', 44);
            table.string('chaveNFeDevolucao4', 44).checkLength('<=', 44);
            
            table.date('dataLiberacao');
            table.date('dataFaturamento');
            table.float('nfe');
            table.float('chaveNFe');
            table.string('protocolo', 15).checkLength('<=', 15);

            // Transportadora
            table.bigInteger('transportadoraId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.transportadoras).onUpdate('CASCADE').onDelete('RESTRICT');
            
            table.string('modalidadeFrete', 1).checkLength('<=', 1);
            table.float('valorFrete');

            table.float('pesoEmbalagem');
            table.float('numeroCaixa');
            table.float('quantidade');
            table.string('especie', 50).checkLength('<=', 50);
            table.float('pesoLiquido');
            table.float('pesoBruto');
            table.string('marca', 50).checkLength('<=', 50);

            //Totais
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

            //Pagamentos
            table.boolean('vistaPrazo');
            table.date('dataVencimento');
            table.string('descricaoVista', 200).checkLength('<=', 200);

            table.float('vencimento1');
            table.float('vencimento2');
            table.float('vencimento3');
            table.float('vencimento4');
            table.float('vencimento5');
            table.float('vencimento6');
            table.float('vencimento7');
            table.float('vencimento8');
            table.float('vencimento9');
            table.float('vencimento10');
            table.float('vencimento11');
            table.float('vencimento12');

            table.string('tipoPagamento', 30).checkLength('<=', 30);
            table.boolean('comissaoValor');
            table.float('comissao');
            table.float('valor');

            table.bigInteger('vendedorId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.vendedores).onUpdate('CASCADE').onDelete('RESTRICT');

            //Mensagens
            table.bigInteger('mensagemId').nullable().defaultTo(null).index().references('id')
                .inTable(ETableNames.pedidosVendas).onUpdate('CASCADE').onDelete('RESTRICT');
            
            table.string('mensagemImpressao', 8000).checkLength('<=', 8000);
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
import { IPedidosVendas } from '../../models';
import { ETableNames } from '../../ETableNames';
import { format, parse } from 'date-fns';
import { Knex } from '../../knex';

export const updateById = async (id: number, pedido: Omit<IPedidosVendas, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        if (pedido.clienteId === 0) { delete pedido.clienteId; }
        if (pedido.transportadoraId === 0) { delete pedido.transportadoraId; }
        if (pedido.vendedorId === 0) { delete pedido.vendedorId; }
        if (pedido.mensagemId === 0) { delete pedido.mensagemId; }

        let dataEmissaoFormatada;
        if (pedido.dataEmissao) {
            const dataEmissao = parse(pedido.dataEmissao, 'ddMMyyyy', new Date());
            dataEmissaoFormatada = format(dataEmissao, 'yyyy-MM-dd');
        }

        let dataLiberacaoFormatada;
        if (pedido.dataLiberacao) {
            const dataLiberacao = parse(pedido.dataLiberacao, 'ddMMyyyy', new Date());
            dataLiberacaoFormatada = format(dataLiberacao, 'yyyy-MM-dd');
        }

        let dataFaturamentoFormatada;
        if (pedido.dataFaturamento) {
            const dataFaturamento = parse(pedido.dataFaturamento, 'ddMMyyyy', new Date());
            dataFaturamentoFormatada = format(dataFaturamento, 'yyyy-MM-dd');
        }

        let dataVencimentoFormatada;
        if (pedido.dataVencimento) {
            const dataVencimento = parse(pedido.dataVencimento, 'ddMMyyyy', new Date());
            dataVencimentoFormatada = format(dataVencimento, 'yyyy-MM-dd');
        }

        const result = await Knex(ETableNames.pedidosVendas)
            .update({...pedido, 
                dataEmissao: dataEmissaoFormatada,
                dataLiberacao: dataLiberacaoFormatada,
                dataFaturamento: dataFaturamentoFormatada,
                dataVencimento: dataVencimentoFormatada
            })
            .where('id', '=', id);
            
        if(result) return;

        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
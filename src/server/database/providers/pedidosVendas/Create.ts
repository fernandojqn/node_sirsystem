import { IPedidosVendas } from '../../models';
import { ETableNames } from '../../ETableNames';
import { format, parse } from 'date-fns';
import { Knex } from '../../knex';

export const create = async (pedido: Omit<IPedidosVendas, 'id'>): Promise<object | Number | Error> => {
    
    try {
        if (pedido.clienteId === 0) { delete pedido.clienteId; }

        let dataEmissaoFormatada;
        if (pedido.dataEmissao) {
            const dataEmissao = parse(pedido.dataEmissao, 'ddMMyyyy', new Date());
            dataEmissaoFormatada = format(dataEmissao, 'yyyy-MM-dd');
        }

        let prazoEntregaFormatada;
        if (pedido.prazoEntrega) {
            const prazoEntrega = parse(pedido.prazoEntrega, 'ddMMyyyy', new Date());
            prazoEntregaFormatada = format(prazoEntrega, 'yyyy-MM-dd');
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

        
        const [result] = await Knex(ETableNames.pedidosVendas)
            .insert({...pedido, 
                dataEmissao: dataEmissaoFormatada,
                prazoEntrega: prazoEntregaFormatada,
                dataLiberacao: dataLiberacaoFormatada,
                dataFaturamento: dataFaturamentoFormatada
            })
            .returning('id');
        
        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};



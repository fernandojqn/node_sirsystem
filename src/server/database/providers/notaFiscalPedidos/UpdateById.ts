import { INotaFiscalPedidos } from '../../models';
import { ETableNames } from '../../ETableNames';
import { format, parse } from 'date-fns';
import { Knex } from '../../knex';

export const updateById = async (id: number, pedido: Omit<INotaFiscalPedidos, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        if (pedido.clienteId === 0) { 
            delete pedido.clienteId; 
        }

        let dataEmissaoFormatada;
        if (pedido.dataEmissao) {
            const dataEmissao = parse(pedido.dataEmissao, 'dd/MM/yyyy', new Date());
            dataEmissaoFormatada = format(dataEmissao, 'yyyy-MM-dd');
        }

        let prazoEntregaFormatada;
        if (pedido.prazoEntrega) {
            const prazoEntrega = parse(pedido.prazoEntrega, 'dd/MM/yyyy', new Date());
            prazoEntregaFormatada = format(prazoEntrega, 'yyyy-MM-dd');
        }

        let dataLiberacaoFormatada;
        if (pedido.dataLiberacao) {
            const dataLiberacao = parse(pedido.dataLiberacao, 'dd/MM/yyyy', new Date());
            dataLiberacaoFormatada = format(dataLiberacao, 'yyyy-MM-dd');
        }

        let dataFaturamentoFormatada;
        if (pedido.dataFaturamento) {
            const dataFaturamento = parse(pedido.dataFaturamento, 'dd/MM/yyyy', new Date());
            dataFaturamentoFormatada = format(dataFaturamento, 'yyyy-MM-dd');
        }


        const result = await Knex(ETableNames.notaFiscalPedidos)
            .update({...pedido, 
                dataEmissao: dataEmissaoFormatada,
                prazoEntrega: prazoEntregaFormatada,
                dataLiberacao: dataLiberacaoFormatada,
                dataFaturamento: dataFaturamentoFormatada
            })
            .where('id', '=', id);
            
        if(result) return;

        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
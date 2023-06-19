import { IPedidosVendasPagamentos } from '../../models';
import { ETableNames } from '../../ETableNames';
import { format, parse } from 'date-fns';
import { Knex } from '../../knex';

export const updateById = async (id: number, pagamento: Omit<IPedidosVendasPagamentos, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        if (pagamento.pedidoId === 0) { delete pagamento.pedidoId; }
        if (pagamento.vendedorId === 0) { delete pagamento.vendedorId; }
        
        let dataVencimentoFormatada;
        if (pagamento.dataVencimento) {
            const dataVencimento = parse(pagamento.dataVencimento, 'ddMMyyyy', new Date());
            dataVencimentoFormatada = format(dataVencimento, 'yyyy-MM-dd');
        }


        const result = await Knex(ETableNames.pedidosVendasPagamentos)
            .update({...pagamento, 
                dataVencimento: dataVencimentoFormatada
            })
            .where('id', '=', id);
            
        if(result) return;

        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
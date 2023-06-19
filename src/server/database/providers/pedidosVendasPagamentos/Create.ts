import { IPedidosVendasPagamentos } from '../../models';
import { ETableNames } from '../../ETableNames';
import { format, parse } from 'date-fns';
import { Knex } from '../../knex';

export const create = async (pagamento: Omit<IPedidosVendasPagamentos, 'id'>): Promise<object | number | Error> => {
    
    try {    
        if (pagamento.pedidoId === 0) { delete pagamento.pedidoId; }
        if (pagamento.vendedorId === 0) { delete pagamento.vendedorId; }
        
        //Datas
        let dataVencimentoFormatada;
        if (pagamento.dataVencimento) {
            const dataVencimento = parse(pagamento.dataVencimento, 'ddMMyyyy', new Date());
            dataVencimentoFormatada = format(dataVencimento, 'yyyy-MM-dd');
        }       
       
        const [result] = await Knex(ETableNames.pedidosVendasPagamentos)
            .insert({...pagamento, 
                dataVencimento: dataVencimentoFormatada
            })
            .returning('id');
        
        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
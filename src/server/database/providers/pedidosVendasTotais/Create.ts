import { IPedidosVendasTotais } from '../../models';
import { ETableNames } from '../../ETableNames';
import { format, parse } from 'date-fns';
import { Knex } from '../../knex';


export const create = async (totais: Omit<IPedidosVendasTotais, 'id'>): Promise<object | Number | Error> => {
    
    try {
        if (totais.pedidoId === 0) { 
            delete totais.pedidoId; 
        }

        if (totais.vendedorId === 0) { 
            delete totais.vendedorId; 
        }

        if (totais.transportadoraId === 0) { 
            delete totais.transportadoraId; 
        }

        if (totais.codigoMensagemId === 0) { 
            delete totais.codigoMensagemId; 
        }

        let dataVencimentoFormatada;
        if (totais.dataVencimento) {
            const dataVencimento = parse(totais.dataVencimento, 'ddMMyyyy', new Date());
            dataVencimentoFormatada = format(dataVencimento, 'yyyy-MM-dd');
        }
        
        const [result] = await Knex(ETableNames.pedidosVendasTotais)
            .insert({...totais, dataVencimento: dataVencimentoFormatada})
            .returning('id');
        
        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};



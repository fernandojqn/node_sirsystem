import { IPedidosVendasTotais } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const create = async (totais: Omit<IPedidosVendasTotais, 'id'>): Promise<object | Number | Error> => {
    
    try {
        if (totais.pedidoId === 0) { 
            delete totais.pedidoId; 
        }

        const [result] = await Knex(ETableNames.pedidosVendasTotais)
            .insert(totais)
            .returning('id');
        
        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};



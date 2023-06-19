import { IPedidosVendasTransportadoras } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const create = async (transportadoras: Omit<IPedidosVendasTransportadoras, 'id'>): Promise<object | Number | Error> => {
    
    try {
        if (transportadoras.pedidoId === 0) { delete transportadoras.pedidoId; }
        if (transportadoras.transportadoraId === 0) { delete transportadoras.transportadoraId; }

        const [result] = await Knex(ETableNames.pedidosVendasTransportadoras)
            .insert(transportadoras)
            .returning('id');
        
        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};



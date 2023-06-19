import { IPedidosVendasTransportadoras } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const updateById = async (id: number, transportadoras: Omit<IPedidosVendasTransportadoras, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        if (transportadoras.pedidoId === 0) { delete transportadoras.pedidoId; }
        if (transportadoras.transportadoraId === 0) { delete transportadoras.transportadoraId; }

        const result = await Knex(ETableNames.pedidosVendasTransportadoras)
            .update(transportadoras)
            .where('id', '=', id);
            
        if(result) return;

        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
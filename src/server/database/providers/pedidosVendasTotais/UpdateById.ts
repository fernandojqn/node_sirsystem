import { IPedidosVendasTotais } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const updateById = async (id: number, totais: Omit<IPedidosVendasTotais, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        if (totais.pedidoId === 0) { 
            delete totais.pedidoId; 
        }

        const result = await Knex(ETableNames.pedidosVendasTotais)
            .update(totais)
            .where('id', '=', id);
            
        if(result) return;

        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
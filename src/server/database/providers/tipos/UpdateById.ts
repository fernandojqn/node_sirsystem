import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITipo } from '../../models';

export const updateById = async (id: number, tipo: Omit<ITipo, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.tipos)
            .update(tipo)
            .where('id', '=', id);
            
        if(result) return;

        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
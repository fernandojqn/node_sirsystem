import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { INcm } from '../../models';


export const updateById = async (id: number, ncm: Omit<INcm, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.ncm)
            .update(ncm)
            .where('id', '=', id);
            
        if(result) return;


        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
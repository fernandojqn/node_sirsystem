import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IGrupo } from '../../models';


export const updateById = async (id: number, grupo: Omit<IGrupo, 'id'>): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.grupos)
            .update(grupo)
            .where('id', '=', id);
            
        if(result) return;


        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
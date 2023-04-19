import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IAtividade } from '../../models';


export const UpdateById = async (id: number, atividade: Omit<IAtividade, 'id'>): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.atividades)
            .update(atividade)
            .where('id', '=', id);
            
        if(result) return;


        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
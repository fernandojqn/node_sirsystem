import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IAtividade } from '../../models';


export const create = async (atividade: Omit<IAtividade, 'id'>): Promise<object | Number | Error> => {

    try {
        const [result] = await Knex(ETableNames.atividades)
            .insert(atividade)
            .returning('id');

        
        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};



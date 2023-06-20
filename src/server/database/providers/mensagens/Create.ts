import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IMensagem } from '../../models';

export const create = async (mensagem: Omit<IMensagem, 'id'>): Promise<object | Number | Error> => {

    try {
        const [result] = await Knex(ETableNames.mensagens)
            .insert(mensagem)
            .returning('id');

        
        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};



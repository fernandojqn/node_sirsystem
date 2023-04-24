import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITributacao } from '../../models';


export const create = async (tributacao: Omit<ITributacao, 'id'>): Promise<number | Error> => {

    try {
        const [result] = await Knex(ETableNames.tributacoes)
            .insert(tributacao)
            .returning('id');

        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }


        return new Error('Erro ao cadastrar o registro');
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
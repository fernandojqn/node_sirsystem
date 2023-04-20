import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { INcm } from '../../models';


export const create = async (ncm: Omit<INcm, 'id'>): Promise<number | Error> => {

    try {
        const [result] = await Knex(ETableNames.ncm)
            .insert(ncm)
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
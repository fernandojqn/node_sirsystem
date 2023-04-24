import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IModelo } from '../../models';


export const create = async (modelo: Omit<IModelo, 'id'>): Promise<number | Error> => {

    try {
        const [result] = await Knex(ETableNames.modelos)
            .insert(modelo)
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
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IModelo } from '../../models';


export const create = async (modelo: Omit<IModelo, 'id' | 'empresaId' | 'usuarioId'>): Promise<object | number | Error> => {

    try {
        const [result] = await Knex(ETableNames.modelos)
            .insert(modelo)
            .returning('id');


        return result;

    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
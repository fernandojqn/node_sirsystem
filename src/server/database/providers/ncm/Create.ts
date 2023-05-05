import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { INcm } from '../../models';


export const create = async (ncm: Omit<INcm, 'id' | 'empresaId' | 'usuarioId'>): Promise<object | number | Error> => {

    try {
        const [result] = await Knex(ETableNames.ncm)
            .insert(ncm)
            .returning('id');
        
        return result;

    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
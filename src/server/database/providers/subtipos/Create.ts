import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ISubTipo } from '../../models';


export const create = async (subTipo: Omit<ISubTipo, 'id' | 'empresaId' | 'usuarioId'>): Promise<object | number | Error> => {

    try {
        const [result] = await Knex(ETableNames.subTipos)
            .insert(subTipo)
            .returning('id');


        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
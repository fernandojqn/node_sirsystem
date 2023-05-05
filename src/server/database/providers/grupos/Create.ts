import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IGrupo } from '../../models';


export const create = async (grupo: Omit<IGrupo, 'id' | 'empresaId' | 'usuarioId'>): Promise<object | number | Error> => {

    try {
        const [result] = await Knex(ETableNames.grupos)
            .insert(grupo)
            .returning('id');


        return result;
       
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
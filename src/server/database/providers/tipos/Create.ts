import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITipo } from '../../models';


export const create = async (tipo: Omit<ITipo, 'id' | 'empresaId' | 'usuarioId'>): Promise<object | number | Error> => {

    try {
        const [result] = await Knex(ETableNames.tipos)
            .insert(tipo)
            .returning('id');

        
        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITransportadora } from '../../models';


export const create = async (transportadora: Omit<ITransportadora, 'id' | 'empresaId' | 'usuarioId'>): Promise<object | number | Error> => {

    try {
        const [result] = await Knex(ETableNames.transportadoras)
            .insert(transportadora)
            .returning('id');

        return result;
  
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
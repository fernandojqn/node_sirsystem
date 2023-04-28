import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICliente } from '../../models';


export const create = async (cliente: Omit<ICliente, 'id' | 'empresaId' | 'usuarioId'>): Promise<number | Error> => {

    try {
        const [result] = await Knex(ETableNames.clientes)
            .insert(cliente)
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
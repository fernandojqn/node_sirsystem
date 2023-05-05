import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICliente } from '../../models';


export const create = async (cliente: Omit<ICliente, 'id' | 'empresaId' | 'usuarioId'>): Promise<object | Error> => {

    try {
        const [result] = await Knex(ETableNames.clientes)
            .insert(cliente)
            .returning('id');

        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
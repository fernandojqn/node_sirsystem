import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IVendedor } from '../../models';


export const create = async (vendedor: Omit<IVendedor, 'id' | 'empresaId' | 'usuarioId'>): Promise<object | number | Error> => {

    try {
        const [result] = await Knex(ETableNames.vendedores)
            .insert(vendedor)
            .returning('id');

        return result;

    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICliente } from '../../models';




export const create = async (cliente: Omit<ICliente, 'id' | 'empresaId' | 'usuarioId'>): Promise<object | Error> => {

    try {
        // os IFs são para quando deixar o cbos em branco ele tira os
        // campos do form para salvar nulo
        if (cliente.atividadeId === 0) {
            delete cliente.atividadeId;
        }

        if (cliente.vendedorId === 0) {
            delete cliente.vendedorId;
        }

        const [result] = await Knex(ETableNames.clientes)
            .insert(cliente)
            .returning('id');

        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
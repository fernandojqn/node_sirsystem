import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICliente } from '../../models';


export const updateById = async (id: number, cliente: Omit<ICliente, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        // os IFs são para quando deixar o cbos em branco ele tira os
        // campos do form para salvar nulo
        if (cliente.atividadeId === 0) {
            delete cliente.atividadeId;
        }

        if (cliente.vendedorId === 0) {
            delete cliente.vendedorId;
        }

        const result = await Knex(ETableNames.clientes)
            .update(cliente)
            .where('id', '=', id);
            
        if(result) return;

        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IFornecedor } from '../../models';


export const create = async (fornecedor: Omit<IFornecedor, 'id' | 'empresaId' | 'usuarioId'>): Promise<object | number | Error> => {

    try {
        const [result] = await Knex(ETableNames.fornecedores)
            .insert(fornecedor)
            .returning('id');

        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
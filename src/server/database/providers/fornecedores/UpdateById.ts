import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IFornecedor } from '../../models';


export const updateById = async (id: number, fornecedor: Omit<IFornecedor, 'id'>): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.fornecedores)
            .update(fornecedor)
            .where('id', '=', id);
            
        if(result) return;


        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
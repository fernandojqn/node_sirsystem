import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IProduto } from '../../models';


export const updateById = async (id: number, produto: Omit<IProduto, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.produtos)
            .update(produto)
            .where('id', '=', id);
            
        if(result) return;


        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
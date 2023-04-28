import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITributacao } from '../../models';


export const updateById = async (id: number, tributacao: Omit<ITributacao, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.tributacoes)
            .update(tributacao)
            .where('id', '=', id);
            
        if(result) return;


        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
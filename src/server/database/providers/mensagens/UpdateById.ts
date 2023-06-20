import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IMensagem } from '../../models';

export const updateById = async (id: number, mensagem: Omit<IMensagem, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.mensagens)
            .update(mensagem)
            .where('id', '=', id);
            
        if(result) return;

        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
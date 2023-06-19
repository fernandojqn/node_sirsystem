import { IPedidosVendasMensagens } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const updateById = async (id: number, mensagens: Omit<IPedidosVendasMensagens, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        if (mensagens.pedidoId === 0) { delete mensagens.pedidoId; }
        if (mensagens.mensagemId === 0) { delete mensagens.mensagemId; }

        const result = await Knex(ETableNames.pedidosVendasMensagens)
            .update(mensagens)
            .where('id', '=', id);
            
        if(result) return;

        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
import { IPedidosVendasMensagens } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const create = async (mensagens: Omit<IPedidosVendasMensagens, 'id'>): Promise<object | Number | Error> => {
    
    try {
        if (mensagens.pedidoId === 0) { delete mensagens.pedidoId; }
        if (mensagens.mensagemId === 0) { delete mensagens.mensagemId; }

        const [result] = await Knex(ETableNames.pedidosVendasMensagens)
            .insert(mensagens)
            .returning('id');
        
        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};



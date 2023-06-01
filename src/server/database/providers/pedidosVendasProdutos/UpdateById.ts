import { IPedidosVendasProdutos } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const updateById = async (id: number, produto: Omit<IPedidosVendasProdutos, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        if (produto.pedidoId === 0) { 
            delete produto.pedidoId; 
        }

        if (produto.produtoId === 0) { 
            delete produto.produtoId; 
        }


        const result = await Knex(ETableNames.pedidosVendasProdutos)
            .update(produto)
            .where('id', '=', id);
            
        if(result) return;

        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
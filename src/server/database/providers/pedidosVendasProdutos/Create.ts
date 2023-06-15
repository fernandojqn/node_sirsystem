import { IPedidosVendasProdutos } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const create = async (produto: Omit<IPedidosVendasProdutos, 'id'>): Promise<object | Number | Error> => {
    
    try {
        delete produto.produto;
        delete produto.descricaoDetalhada;
        
        if (produto.pedidoId === 0) { delete produto.pedidoId; }
        if (produto.produtoId === 0) { delete produto.produtoId; }
        
        const [result] = await Knex(ETableNames.pedidosVendasProdutos)
            .insert(produto)
            .returning('id');
         
        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
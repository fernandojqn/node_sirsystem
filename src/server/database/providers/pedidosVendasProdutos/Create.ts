import { IPedidosVendasProdutos } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const create = async (produto: Omit<IPedidosVendasProdutos, 'id'>): Promise<object | Number | Error> => {
    
    try {
        if (produto.pedidoId === 0) { 
            delete produto.pedidoId; 
        }

        if (produto.produtoId === 0) { 
            delete produto.produtoId; 
        }

        if (produto.regraTributacaoId === 0) { 
            delete produto.regraTributacaoId; 
        }
        
        const [result] = await Knex(ETableNames.pedidosVendasProdutos)
            .insert(produto)
            .returning('id');
        
        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};



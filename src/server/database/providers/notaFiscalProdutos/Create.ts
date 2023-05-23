import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { INotaFiscalProdutos } from '../../models';


export const create = async (produto: Omit<INotaFiscalProdutos, 'id'>): Promise<object | Number | Error> => {

    try {
        if (produto.pedidoId === 0) { 
            delete produto.pedidoId; 
        }

        if (produto.regraTributacaoId === 0) { 
            delete produto.regraTributacaoId; 
        }

        if (produto.produtoId === 0) { 
            delete produto.produtoId; 
        }

        if (produto.regraTributacaoId === 0) { 
            delete produto.regraTributacaoId; 
        }
        

        const [result] = await Knex(ETableNames.notaFiscalProdutos)
            .insert(produto)
            .returning('id');
        
        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};



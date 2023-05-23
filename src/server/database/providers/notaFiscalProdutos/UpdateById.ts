import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { INotaFiscalProdutos } from '../../models';


export const updateById = async (id: number, produto: Omit<INotaFiscalProdutos, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

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

        const result = await Knex(ETableNames.notaFiscalProdutos)
            .update(produto)
            .where('id', '=', id);
            
        if(result) return;

        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
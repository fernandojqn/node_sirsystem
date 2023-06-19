import { IPedidosVendasProdutos } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const create = async (produto: Omit<IPedidosVendasProdutos, 'id'>): Promise<object | Number | Error> => {
    
    try {
        // Obter o maior número de numeroPedido da tabela
        const maxResult: { maxNumeroItem?: string | undefined }[] = await Knex(ETableNames.pedidosVendasProdutos)
            .max({ maxNumeroItem: 'numeroItem' })
            .where('pedidoId', produto.pedidoId)
            .andWhere('empresaId', produto.empresaId);

        const maxNumeroItem = maxResult[0]?.maxNumeroItem;
        const parsedMaxNumeroItem = maxNumeroItem ? parseInt(maxNumeroItem) : undefined;

        // Verificar se o número do pedido é nulo ou zero
        if (!parsedMaxNumeroItem || parsedMaxNumeroItem === 0) {
            // Definir o número do pedido como 1 se for nulo ou zero
            produto.numeroItem = 1;
        } else {
            // Incrementar o número do pedido em 1 se for maior que 1
            produto.numeroItem = parsedMaxNumeroItem ? parsedMaxNumeroItem + 1 : 1;
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////

        delete produto.descricaoDetalhada;
        
        if (produto.pedidoId === 0) { delete produto.pedidoId; }
        if (produto.produtoId === 0) { delete produto.produtoId; }
        if (produto.regraTributacaoId === 0) { delete produto.regraTributacaoId; }
        
        const [result] = await Knex(ETableNames.pedidosVendasProdutos)
            .insert(produto)
            .returning('id');
         
        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
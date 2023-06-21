import { IPedidosVendas } from '../../models';
import { ETableNames } from '../../ETableNames';
import { format, parse } from 'date-fns';
import { Knex } from '../../knex';

export const create = async (pedido: Omit<IPedidosVendas, 'id'>): Promise<object | number | Error> => {
        
    try {
        // Obter o maior número de numeroPedido da tabela
        const maxResult: { maxPedidoId?: string | undefined }[] = await Knex(ETableNames.pedidosVendas)
            .max({ maxPedidoId: 'pedidoId' })
            .where('empresaId', pedido.empresaId);

        const maxPedidoId = maxResult[0]?.maxPedidoId;
        const parsedMaxPedidoId = maxPedidoId ? parseInt(maxPedidoId) : undefined;

        // Verificar se o número do pedido é nulo ou zero
        if (!parsedMaxPedidoId || parsedMaxPedidoId === 0) {
            // Definir o número do pedido como 1 se for nulo ou zero
            pedido.pedidoId = 1;
        } else {
            // Incrementar o número do pedido em 1 se for maior que 1
            pedido.pedidoId = parsedMaxPedidoId ? parsedMaxPedidoId + 1 : 1;
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////
        
        if (pedido.clienteId === 0) { delete pedido.clienteId; }

        let dataEmissaoFormatada;
        if (pedido.dataEmissao) {
            const dataEmissao = parse(pedido.dataEmissao, 'ddMMyyyy', new Date());
            dataEmissaoFormatada = format(dataEmissao, 'yyyy-MM-dd');
        }
       

        let dataLiberacaoFormatada;
        if (pedido.dataLiberacao) {
            const dataLiberacao = parse(pedido.dataLiberacao, 'ddMMyyyy', new Date());
            dataLiberacaoFormatada = format(dataLiberacao, 'yyyy-MM-dd');
        }

        let dataFaturamentoFormatada;
        if (pedido.dataFaturamento) {
            const dataFaturamento = parse(pedido.dataFaturamento, 'ddMMyyyy', new Date());
            dataFaturamentoFormatada = format(dataFaturamento, 'yyyy-MM-dd');
        }

        // Salvando o Pedidos Vendas
        const [result] = await Knex(ETableNames.pedidosVendas)
            .insert({...pedido, 
                dataEmissao: dataEmissaoFormatada,
                dataLiberacao: dataLiberacaoFormatada,
                dataFaturamento: dataFaturamentoFormatada
            })            
            .returning('id');
        

        return result;        
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
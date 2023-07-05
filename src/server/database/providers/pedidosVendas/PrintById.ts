import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPrintPedidosVendas } from '../../models';


export const printById = async (id: number): Promise<IPrintPedidosVendas | Error> => {
    
    try {
        const result = await Knex(ETableNames.pedidosVendas)
            .select(
                //Pedidos de vendas
                'pedidosVendas.id', 'pedidosVendas.pedidoId', 'pedidosVendas.clienteId', 'pedidosVendas.totalNota', 'pedidosVendas.validadeProposta', 'pedidosVendas.vistaPrazo',
                'pedidosVendas.prazoEntrega', 'pedidosVendas.garantia', 'pedidosVendas.empresaId', 'pedidosVendas.vendedorId', 'pedidosVendas.mensagemImpressao',
                // Dados do cliente
                'clientes.sufixo', 'clientes.contato', 'clientes.telefone', 'clientes.celular', 'clientes.email',
                // Dados da empresa
                'empresas.sufixo as empSufixo', 'empresas.documento', 'empresas.inscricaoEstadual', 'empresas.telefone as empTelefone', 
                'empresas.email as empEmail', 'empresas.endereco', 'empresas.numero', 'empresas.complemento', 'empresas.bairro', 'empresas.cidade',
                'empresas.uf', 'empresas.cep',
                //vendedor
                'vendedores.nome', 'vendedores.documento as venDocumento', 'vendedores.celular as venCelular')


            .join(ETableNames.clientes, 'pedidosVendas.clienteId', '=', 'clientes.id')
            .join(ETableNames.empresas, 'pedidosVendas.empresaId', '=', 'empresas.id')
            .join(ETableNames.vendedores, 'pedidosVendas.empresaId', '=', 'vendedores.id')
            .where('pedidosVendas.id', '=', id)
            .first();

        

        if(result) return result;


        return new Error('Registro não encontrado');
    } catch (error) {
        return new Error('Erro ao consultar o registro');
    }
};
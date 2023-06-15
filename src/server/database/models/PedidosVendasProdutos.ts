export interface IPedidosVendasProdutos {
    id: number;
    
    pedidoId?: number;
    produtoId?: number;

    codigoProduto?: string;
    produto?: string;
    descricaoDetalhada?: string;
    
    numeroItem?: number;
    embalagemUnidade?: boolean;
    quantidade?: number;
    
    quantidadeEmbalagem?: number;
    unidade?: string;
    condicao?: string;
    precoUnitario?: number;
    precoItem?: number;
    desconto?: number;
    subTotal?: number;
    frete?: number;
    seguro?: number;
    totalItem?: number;
    compoemValorTotal?: boolean;

    pedidoCompra?: string;
    pedidoCompraItem?: string;
    localEstoque?: string;
    
    empresaId: number;
    usuarioId: number;
}
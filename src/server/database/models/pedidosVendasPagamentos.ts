export interface IPedidosVendasPagamentos {//56
    id: number;
    pedidoId?: number;    
    
    vistaPrazo?: boolean;
    dataVencimento?: string;
    descricaoVista?: string;

    vencimento1?: number;
    vencimento2?: number;
    vencimento3?: number;
    vencimento4?: number;
    vencimento5?: number;
    vencimento6?: number;
    vencimento7?: number;
    vencimento8?: number;
    vencimento9?: number;
    vencimento10?: number;
    vencimento11?: number;
    vencimento12?: number;

    tipoPagamento?: string;

    comissaoValor?: boolean;
    comissao?: number;
    valor?: number;

    vendedorId?: number;

    empresaId: number;
    usuarioId: number;
}
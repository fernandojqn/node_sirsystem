export interface IPedidosVendasTotais {//56
    id: number;
    pedidoId?: number;    
    
    totalTributos?: number;
    baseCalculo?: number;
    totalICMS?: number;
    baseCalculoICMSst?: number;
    totalICMSst?: number;
    totalProdutosServicos?: number;
    totalFrete?: number;
    icmsPartilhaRemetente?: number;
    icmsPartilhaDestinatario?: number;
    total2?: number;
    totalIPI?: number;
    totalPIS?: number;
    totalCOFINS?: number;
    totalSeguro?: number;
    totalDesconto?: number;
    outrasDespesas?: number;
    icmsDesonerado?: number;
    totalICMSfcp?: number;
    totalICMSstFCP?: number;
    totalICMSstFCPretido?: number;
    totalIPIdevolvido?: number;
    totalICMSfcpUFdestino?: number;
    pisST?: number;
    cofinsST?: number;
    totalNota?: number;

    empresaId: number;
    usuarioId: number;
}
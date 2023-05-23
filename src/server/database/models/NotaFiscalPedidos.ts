export interface INotaFiscalPedidos { //30
    id: number;
    
    numeroPedido?: number;
    dataEmissao?: string;
    status?: string;
    pedidoCliente?: string;
    prazoEntrega?: string;
    garantia?: string;
    validadeProposta?: string;
    
    clienteId?: number;
    nomeCliente?: string;

    naturezaOperacaoCFOP?: string;
    tipoDocumento?: boolean;
    consumoInterno?: boolean;
    finalidadeNormal?: boolean;
    finalidadeComplementar?: boolean;
    finalidadeAjuste?: boolean;
    finalidadeDevolucao?: boolean;
    consumidorFinal?: boolean;

    chaveNFeDevolucao1?: string;
    chaveNFeDevolucao2?: string;
    chaveNFeDevolucao3?: string;
    chaveNFeDevolucao4?: string;

    dataLiberacao?: string;
    totalNota?: number;
    dataFaturamento?: string;
    nfe?: string;
    chaveNFe?: string;
    protocolo?: string;

    empresaId?: number;
    usuarioId?: number;
}
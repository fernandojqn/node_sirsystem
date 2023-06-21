export interface IPedidosVendas { //30
    id: number;
        
    pedidoId?: number;
    dataEmissao?: string;
    status?: string;
    pedidoCliente?: string;
    prazoEntrega?: string;
    garantia?: string;
    validadeProposta?: string;
    
    clienteId?: number;
    sufixo?: string;
    contato?: string;
    telefone?: string;
    celular?: string;


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
    nfe?: number;
    chaveNFe?: number;
    protocolo?: string;

    empresaId?: number;
    usuarioId?: number;
}
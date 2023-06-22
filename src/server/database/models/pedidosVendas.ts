export interface IPedidosVendas { //30
    id: number;        
    pedidoId?: number;

    //Pedido
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
    dataFaturamento?: string;
    nfe?: number;
    chaveNFe?: number;
    protocolo?: string;

    //Transportadora
    transportadoraId?: number;
    modalidadeFrete?: string;
    valorFrete?: number;
    pesoEmbalagem?: number;
    numeroCaixa?: number;
    quantidade?: number;
    especie?: string;
    pesoLiquido?: number;
    pesoBruto?: number;
    marca?: string;

    //Totais
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

    //Pagamento
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

    //Mensagens
    mensagemId?: number;    
    mensagemImpressao?: string;
    informacoesAdicionais?: string;
    observacoesInternas?: string;

    //Logica
    empresaId?: number;
    usuarioId?: number;
}
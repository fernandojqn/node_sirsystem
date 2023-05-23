export interface INotaFiscalTotais {//56
    id: number;
    pedidoId?: number;
    
    
    totalProdutosServicos?: number;
    baseCalculo1?: number;
    baseCalculo2?: number;
    icmsFCP?: number;

    icmsPartilhaRemetente?: number;
    icmsFCPufDestino?: number;
    totalIPI?: number;
    devolvidoIPI?: number;
    baseCalculoICMSst1?: number;
    baseCalculoICMSst2?: number;

    icmsFCPst?: number;
    icmsSTpartilhaDestinatario?: number;
    icmsSTdesonerado?: number;
    totalCOFINS?: number;
    totalPIS?: number;
    totalFrete?: number;
    totalDesconto?: number;
    totalSeguro?: number;
    totalOutros?: number;

    //Forma de Pagamento
    vistaprazo?: boolean;
    dataVencimento?: string;
    descricaoAvista?: string;
    prazoDias1?: number;
    prazoDias2?: number;
    prazoDias3?: number;
    prazoDias4?: number;
    prazoDias5?: number;
    prazoDias6?: number;
    prazoDias7?: number;
    prazoDias8?: number;
    prazoDias9?: number;
    prazoDias10?: number;
    prazoDias11?: number;
    prazoDias12?: number;

    //Comissionamento
    comissaoValor?: boolean;
    comissao?: number;
    valor?: number;
    vendedorId?: number;

    //Transportadora
    transportadoraId?: number;
    modalidadeFrete?: string;
    valorTotalFrete?: number;
    pesoEmbalagem?: number;
    numeroEmbalagem?: string;
    quantidadeEmbalagem?: number;
    especieEmbalagem?: string;
    pesoLiquidoEmbalagem?: number;
    pesoBrutoEmbalagem?: number;
    marca?: string;

    //mensagens
    codigoMensagemId?: number;
    impressaoPedido?: string;
    informacoesAdicionais?: string;
    observacoesInternas?: string;



    empresaId: number;
    usuarioId: number;
}
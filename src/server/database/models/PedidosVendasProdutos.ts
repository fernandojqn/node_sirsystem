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

    // Impostos //
    regraTributacaoId?: number;
    cst?: string;
    cfop?: string;
    cest?: string;
    ncm?: string;
    //ICMS
    icmsSituacaoTributaria?: string;
    icmsOrigem?: string;
    icmsBaseReducao?: number;
    icmsReducao?: number;
    icmsBaseCalculo?: number;
    icmsAliquota?: number;
    icmsValor?: number;
    icmsOperacao?: number;
    icmsDiferencial?: number;
    icmsDiferido?: number;
    //ICMS ST
    icmsSTReducao?: number;
    icmsSTValor?: number;
    icmsSTmva?: number;
    icmsSTmvaValor?: number;
    icmsSTAliquota?: number;
    icmsSTAliquotaValor?: number;
    icmsSTuf?: string;
    //FCP
    fcpBase?: number;
    fcpAliquota?: number;
    fcpValor?: number;
    // IPI
    ipiSituacaoTributaria?: string;
    ipiBase?: number;
    ipiAliquota?: number;
    ipiValor?: number;
    //Cofins
    cofinsSituacaoTribunal?: string;
    cofinsBase?: number;
    cofinsAliquota?: number;
    cofinsValor?: number;
    //PIS
    pisSituacaoTribunal?: string;
    pisBase?: number;
    pisAliquota?: number;
    pisValor?: number;
    //ICMS-Estadual
    icmsRelativo?: number;
    baseCalculo?: number;
    baseCalculoFCP?: number;
    internaUFdestino?: number;
    interestadual?: number;
    provisoriaPartilha?: number;
    icmsDestino?: number;
    icmsRemetente?: number;
    icmsFCPdestino?: number;

    empresaId: number;
    usuarioId: number;
}

    
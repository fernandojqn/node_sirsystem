export interface INotaFiscalProdutos {
    id: number;
    
    pedidoId?: number;
    
    produtoId?: number;
    
    numeroItem?: number;
    embalagemUnidade?: boolean;
    quantidade?: number;
    quantidadeEmbalagem?: number;
    tipoEmbalagem?: string;
    unidade?: number;
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
    pedidoCliente?: string;
    pedidoNFe?: string;

    //////Impostos//////
    regraTributacaoId?: number;
    cst?: string;
    cfop?: string;
    cest?: string;
    ncm?: string;
    //icms
    situacaoTributariaICMS?: string;
    origemICMS?: string;
    baseReducaoICMS?: number;
    reducaoICMS?: number; 
    baseCalculoICMS?: number;
    aliquotaICMS?: number;
    valorICMS?: number;
    operacaoICMS?: number;
    diferencaICMS?: number;
    diferidoICMS?: number;
    //ICMS ST
    reducaoICMSst?: number;
    valorICMSst?: number;
    mvaICMSst?: number;
    MVAvalorICMSst?: number;
    aliquotaICMSst?: number;
    icmsST?: number;
    ufICMSst?: string;
    //FCP
    baseICMSfcp?: number;
    aliquotaICMSfcp?: number;
    icmsFCP?: number;
    //IPI
    situacaoTributariaIPI?: string;
    baseCalculoIPI?: number;
    aliquotaIPI?: number;
    valorIPI?: number;
    //COFINS
    situacaoTributariaCOFINS?: string;
    baseCalculoCOFINS?: number;
    aliquotaCOFINS?: number;
    valorCOFINS?: number;
    //PIS
    situacaoTributariaPIS?: string;
    baseCalculoPIS?: number;
    aliquotaPIS?: number;
    valorPIS?: number;
    //ICMS-Estadual
    porcentagemICMSrelativoFCPufDestino?: number;
    valorBaseCalculoUFDestino?: number;
    valorBaseCalculoFCPnaUF?: number;
    internaUFdestino?: number;
    interestadual?: number;
    provisoriaPartilha?: number;
    icmsPartilhaUFdestino?: number;
    icmsPartilhaUFremetente?: number;
    icmsRelativoFCPufDestino?: number;

    empresaId: number;
    usuarioId: number;
}
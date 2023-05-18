export interface IProduto {
    id: number;
    produto: string;    
    codigoProduto: string;     
    ean: string;
    
    grupoId?: number; //forgot grupo
    tipoId?: number; //forgot tipo
    subId?: number; //forgot subtipo
    modeloId?: number; //forgot modelo

    descricaoDetalhada?: string; 
    origem?: string; 
    cfop?: string; 
    cstVendas?: string; 
    escrituracao?: string; 

    ncmId?: number; //forgot ncm

    embalagem?: string; 

    quantidadeEmbalagem?: number; 

    unidade?: string; 

    liquido?: number; 

    bruto?: number; 

    fornecedor1Id?: number; // forgot fornecedor
    fornecedor2Id?: number; // forgot fornecedor
    fornecedor3Id?: number; // forgot fornecedor

    codigoFabricante?: string; 
    dataUltimaCompra?: string; 
    nfe?: string; 

    produtoAtivo?: boolean; 
    produtoAcabado?: boolean; 
    proprio?: boolean; 
    terceiros?: boolean; 
    receita?: boolean; 
    paraVenda?: boolean; 
    paraCompra?: boolean; 
    outro?: boolean; 
    descricaoOutro?: string; 

    promocao?: boolean; 
    moeda?: string; 
    precoCusto?: number; 
    capagem?: number; 
    precoCompra?: number;

    margemLucro1?: number; 
    margemLucro2?: number; 
    margemLucro3?: number; 
    margemLucro4?: number; 
    margemLucro5?: number;
    condicao1?: string; 
    condicao2?: string; 
    condicao3?: string; 
    condicao4?: string; 
    condicao5?: string; 
    precoVenda1?: number; 
    precoVenda2?: number; 
    precoVenda3?: number; 
    precoVenda4?: number; 
    precoVenda5?: number;

    ipiCompra?: number; 
    ipiVenda?: number; 
    icmsCompra?: number; 
    icmsVenda?: number; 
    pis?: number; 
    cofins?: number; 
    baseCalculoReduzida?: boolean; 
    porcentagemReducao?: number; 
    comissaoDiferenciada?: boolean; 
    porcentagemComissao?: number;
    

    empresaId: number;
    usuarioId: number;

}
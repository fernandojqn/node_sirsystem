export interface IProduto {
    id: number;
    
    produto: string; 
    codigoProduto: string; 
    ean: string; 
    grupo: number; 
    tipo: number; 
    sub: number; 
    modelo: number; 
    descricaoDetalhada: string; 
    
    origem: string; 
    cfop: string; 
    cstVendas: string; 
    escrituracao: string; 
    ncm: number; 

    embalagem: string; 
    quantidadeEmbalagem: string; 
    unidade: string; 
    liquido: string; 
    bruto: string; 
    fornecedor1: number; 
    fornecedor2: number; 
    fornecedor3: number; 
    codigoFabricante: string; 
    dataUltimaCompra: string; 
    nfe: string; 
    
    produtoAtivo: boolean; 
    produtoAcabado: boolean; 
    proprio: boolean; 
    terceiros: boolean; 
    receita: boolean; 
    paraVenda: boolean; 
    paraCompra: boolean; 
    outros: boolean; 
    descricaoOutros: string; 

    promocao: string; 
    moeda: string; 
    precoCusto: number; 
    capagem: number; 
    precoCompra: number;
    
    acrecimo: string;
    margemLucro1: number; 
    margemLucro2: number; 
    margemLucro3: number; 
    margemLucro4: number; 
    margemLucro5: number;
    condicao1: string; 
    condicao2: string; 
    condicao3: string; 
    condicao4: string; 
    condicao5: string; 
    precoVenda1: number; 
    precoVenda2: number; 
    precoVenda3: number; 
    precoVenda4: number; 
    precoVenda5: number;
    
    ipiCompra: number; 
    ipiVenda: number; 
    icmsCompra: number; 
    icmsVenda: number; 
    pis: number; 
    cofins: number; 
    baseCalcReduzida: boolean; 
    porcReducao: number; 
    comisDiferenciada: boolean; 
    porcComissao: number;
}
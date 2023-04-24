export interface IEmpresa {
    id: number;
    
    sufixo: string; 
    nome: string; 
    
    tipoEmpresa: string; 
    documento: string; 
    inscricao: string; 
    ccm: string;
    
    contato: string; 
    telefone: string; 
    celular: string; 
    email: string; 
    site: string;
    
    endereco: string; 
    numero: string; 
    complemento: string; 
    bairro: string; 
    cidade: string;
    uf: string; 
    cep: string; 
    pais: string; 
    municipio: string;
    
    unidade: string; 
    nomeUnidade: string; 
    modeloCF: string; 
    numSerie: string; 
    obs: string;
    obsFisco: string;

    codigoNatureza: string; 
    modeloNF: string; 
    serie: string; 
    optanteSN: boolean;
    aliqICMS: number; 
    aliqCOFINS: number; 
    aliqPIS: number; 
    perfil: string;
    
    tipoRegime: string; 
    criterioEscrit: string; 
    apropriacaoCredito: string; 
    tipoContribuicao: string;
    codigoEstrutura: string; 
    codigoOperacao: string;
}
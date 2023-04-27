export interface IEmpresa {
    id: number;
    
    sufixo: string; 
    nome: string; 
    
    tipoEmpresa: string; 
    documento: string; 
    inscricaoEstadual: string; 
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
    codMunicipio: string;
    
    modeloCF: string;
    serieCF: string;
    numSerie: string; 
    obs: string;
    obsFisco: string;
    codigoNatureza: string; 
    modeloNF: string; 
    serie: string; 
    optanteSN: boolean;
    aliquotaICMS: number; 
    aliquotaCOFINS: number; 
    aliquotaPIS: number; 
    perfil: string;

    tipoRegime: string; 
    criterioEscritura: string; 
    apropriacaoCredito: string; 
    tipoContribuicao: string;
    codigoEstrutura: string; 
    codigoOperacao: string;    
}
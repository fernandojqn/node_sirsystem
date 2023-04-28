export interface ICliente {
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
    codMunicipal: string;

    enderecoEnt: string; 
    numeroEnt: string; 
    complementoEnt: string; 
    bairroEnt: string; 
    cidadeEnt: string;
    ufEnt: string; 
    cepEnt: string; 
    paisEnt: string; 
    codMunicipalEnt: string; 

    enderecoCor: string; 
    numeroCor: string; 
    complementoCor: string; 
    bairroCor: string; 
    cidadeCor: string;
    ufCor: string; 
    cepCor: string; 
    paisCor: string; 
    codMunicipalCor: string; 

    pagamento1: string; 
    pagamento2: string; 
    pagamento3: string; 
    pagamento4: string; 
    pagamento5: string; 
    pagamento6: string; 
    desconto1: number; 
    desconto2: number; 
    desconto3: number; 
    obs: string; 
    
    atividadeId: number; //forgot atividade
    vendedorId: number; //forgot vendedor
    cofins: number; 
    pis: number; 
    icms: number; 
    ipi: number;
    simplesNascional: boolean; 
    retemISS: boolean;

    

    empresaId: number;
    usuarioId: number;
}
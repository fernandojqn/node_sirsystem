export interface ICliente {
    id: number;
    
    sufixo: string; 
    nome: string; 
    tipoEmpresa: string; 
    documento: string; 
    inscricao: string; 
    ccm: string;
    
    contato: string; 
    telelefone: string; 
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

    enderecoEnt: string; 
    numeroEnt: string; 
    complementoEnt: string; 
    bairroEnt: string; 
    cidadeEnt: string;
    ufEnt: string; 
    cepEnt: string; 
    paisEnt: string; 
    municipioEnt: string; 

    enderecoCor: string; 
    numeroCor: string; 
    complementoCor: string; 
    bairroCor: string; 
    cidadeCor: string;
    ufCor: string; 
    cepCor: string; 
    paisCor: string; 
    municipioCor: string; 

    pagamento1: string; 
    pagamento2: string; 
    pagamento3: string; 
    pagamento4: string; 
    pagamento5: string; 
    pagamento6: string; 
    desconto1: string; 
    desconto2: string; 
    desconto3: string; 
    obs: string; 
    
    atividade: number; //forgot atividade
    vendedor: number; //forgot vendedor
    cofins: number; 
    pis: number; 
    icms: number; 
    ipi: number;
    simplesNascional: string; 
    retemISS: string;
}
export interface IFornecedor {
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

    cliente: boolean;
    clienteId: number;
    

    empresaId: number;
    usuarioId: number;

}
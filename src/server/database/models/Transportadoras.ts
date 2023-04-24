export interface ITransportadora {
    id: number;
    
    sufixo: string;
    tipoEmpresa: string; 
    documento: string; 
    inscricao: string;
    
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
}
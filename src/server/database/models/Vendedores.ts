export interface IVendedor {
    id: number;

    nome: string;
    sufixo: string;
    tipoEmpresa: string;
    documento: string;
    inscricaoEstadual: string; 
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

    comissao: number; 
    irpf: number; 
    banco: string; 
    agencia: string; 
    conta: string; 
    pix: string;
    obs: string;
}
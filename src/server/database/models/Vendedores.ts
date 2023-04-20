export interface IVendedor {
    id: number;

    nome: string;
    tipoEmpresa: string;
    documento: string;
    inscricao: string; 
    telefone: string;
    celular: string; 
    email: string;

    endereco: string; 
    numero: string; 
    complemento: string; 
    bairro: string; 
    cidade: string;
    uf: string; 
    cep: string; 
    pais: string; 
    municipio: string;

    comissao: number; 
    irpf: number; 
    banco: string; 
    agencia: string; 
    conta: string; 
    pix: string;
    obs: string;

}
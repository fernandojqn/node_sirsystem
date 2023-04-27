export interface ITributacao {
    id: number;
    
    regra: string;
    cfop: string;
    cst: string;
    ncmId: number; // forgot do ncm
    uf: string;
    icms: number;
    ipi: number;
    pis: number;
    cofins: number;
    csll: number;
    irrf: number;
    inss: number;
    iss: number;
    anp: number;
    ibpt: number;
}
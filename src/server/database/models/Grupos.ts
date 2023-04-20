export interface IGrupo {
    id: number;

    grupoDescricao: string;
    produtoAcabado: boolean; 
    materiaPrima: boolean; 
    ncmNumero: string; 
    icms: number; 
    ipi: number; 
    comissao: number; 
    valorMinPraticado: number;
}
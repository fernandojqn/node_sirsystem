export interface IGrupo {
    id: number;

    grupoDescricao: string;
    produtoAcabado: boolean; 
    materiaPrima: boolean; 
    ncmId: number; //forget do ncm
    icms: number;
    ipi: number;
    comissao: number;
    valorMinimoPraticado: number;

    empresaId: number;
    usuarioId: number;
}
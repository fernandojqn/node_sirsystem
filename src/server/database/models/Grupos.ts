export interface IGrupo {
    id: number;

    grupoDescricao: string;
    produtoAcabado: boolean; 
    materiaPrima: boolean; 
    ncmId: number; //forget do ncm
    comissao: number;
}
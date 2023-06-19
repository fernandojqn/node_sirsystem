export interface IPedidosVendasTransportadoras {
    id: number;
        
    pedidoId?: number;
    
    transportadoraId?: number;

    modalidadeFrete?: string;
    valorFrete?: number;

    pesoEmbalagem?: number;
    numeroCaixa?: number;
    quantidade?: number;
    especie?: string;
    pesoLiquido?: number;
    pesoBruto?: number;
    marca?: string;

    empresaId?: number;
    usuarioId?: number;
}
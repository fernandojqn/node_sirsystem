export interface IPedidosVendasMensagens {
    id: number;
        
    pedidoId?: number;
    
    mensagemId?: number;
    
    mensagemImpressao?: string;
    informacoesAdicionais?: string;
    observacoesInternas?: string;

    empresaId?: number;
    usuarioId?: number;
}
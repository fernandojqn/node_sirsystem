export interface IPrintPedidosVendas {
    //Pedios de vendas
    id: number;        
    pedidoId?: number;
    clienteId?: number;        
    vendedorId?: number;
    totalNota?: number;
    validadeProposta?: string;
    vistaPrazo?: boolean;
    prazoEntrega?: string;
    garantia?: string;
    mensagemImpressao?: string;

    //Cliente
    sufixo?: string;
    contato?: string;
    telefone?: string;
    celular?: string;
    email?: string;

    //Empresa
    empSufixo?: string;
    documento?: string;
    inscricaoEstadual?: string;
    empTelefone?: string;
    empEmail?: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;

    //Vendedor
    nome?: string;
    venDocumento?: string;
    venCelular?: string;

    //Logica
    empresaId?: number;
    usuarioId?: number;



    

    
}
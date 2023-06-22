import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IPedidosVendas } from '../../database/models';
import { PedidosVendasProvider } from '../../database/providers';


//Validação
interface IBodyProps extends Omit<IPedidosVendas, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        pedidoId: yup.number().optional().default(0),
        dataEmissao: yup.string().optional().max(10).default(''),
        status: yup.string().optional().max(3).default(''),
        pedidoCliente: yup.string().optional().max(20).default(''),
        prazoEntrega: yup.string().optional().max(20).default(''),
        garantia: yup.string().optional().max(20).default(''),
        validadeProposta: yup.string().optional().max(20).default(''),

        clienteId: yup.number().optional().default(0),
        sufixo: yup.string().optional().max(50).default(''),
        contato: yup.string().optional().max(50).default(''),
        telefone: yup.string().optional().max(15).default(''),
        celular: yup.string().optional().max(15).default(''),

        naturezaOperacaoCFOP: yup.string().optional().max(4).default(''),
        tipoDocumento: yup.boolean().optional().default(false),
        consumoInterno: yup.boolean().optional().default(false),
        finalidadeNormal: yup.boolean().optional().default(false),
        finalidadeComplementar: yup.boolean().optional().default(false),
        finalidadeAjuste: yup.boolean().optional().default(false),
        finalidadeDevolucao: yup.boolean().optional().default(false),
        consumidorFinal: yup.boolean().optional().default(false),

        chaveNFeDevolucao1: yup.string().optional().max(44).default(''),
        chaveNFeDevolucao2: yup.string().optional().max(44).default(''),
        chaveNFeDevolucao3: yup.string().optional().max(44).default(''),
        chaveNFeDevolucao4: yup.string().optional().max(44).default(''),

        dataLiberacao: yup.string().optional().max(10).default(''),
        dataFaturamento: yup.string().optional().max(10).default(''),
        nfe: yup.number().optional().default(0),
        chaveNFe: yup.number().optional().default(0),
        protocolo: yup.string().optional().max(15).default(''),

        //Transportadora
        transportadoraId: yup.number().optional().default(0),

        modalidadeFrete: yup.string().optional().default('').max(30),
        valorFrete: yup.number().optional().default(0),

        pesoEmbalagem: yup.number().optional().default(0),
        numeroCaixa: yup.number().optional().default(0),
        quantidade: yup.number().optional().default(0),
        especie: yup.string().optional().default('').max(50),
        pesoLiquido: yup.number().optional().default(0),
        pesoBruto: yup.number().optional().default(0),
        marca: yup.string().optional().default('').max(50),

        //Totais
        totalTributos: yup.number().optional().default(0),
        baseCalculo: yup.number().optional().default(0),
        totalICMS: yup.number().optional().default(0),
        baseCalculoICMSst: yup.number().optional().default(0),
        totalICMSst: yup.number().optional().default(0),
        totalProdutosServicos: yup.number().optional().default(0),
        totalFrete: yup.number().optional().default(0),
        icmsPartilhaRemetente: yup.number().optional().default(0),
        icmsPartilhaDestinatario: yup.number().optional().default(0),
        total2: yup.number().optional().default(0),
        totalIPI: yup.number().optional().default(0),
        totalPIS: yup.number().optional().default(0),
        totalCOFINS: yup.number().optional().default(0),
        totalSeguro: yup.number().optional().default(0),
        totalDesconto: yup.number().optional().default(0),
        outrasDespesas: yup.number().optional().default(0),
        icmsDesonerado: yup.number().optional().default(0),
        totalICMSfcp: yup.number().optional().default(0),
        totalICMSstFCP: yup.number().optional().default(0),
        totalICMSstFCPretido: yup.number().optional().default(0),
        totalIPIdevolvido: yup.number().optional().default(0),
        totalICMSfcpUFdestino: yup.number().optional().default(0),
        pisST: yup.number().optional().default(0),
        cofinsST: yup.number().optional().default(0),
        totalNota: yup.number().optional().default(0),

        //Pagamentos
        vistaPrazo: yup.boolean().optional().default(false),
        dataVencimento: yup.string().optional().default('').max(10),
        descricaoVista: yup.string().optional().default('').max(200),

        vencimento1: yup.number().optional().default(0),
        vencimento2: yup.number().optional().default(0),
        vencimento3: yup.number().optional().default(0),
        vencimento4: yup.number().optional().default(0),
        vencimento5: yup.number().optional().default(0),
        vencimento6: yup.number().optional().default(0),
        vencimento7: yup.number().optional().default(0),
        vencimento8: yup.number().optional().default(0),
        vencimento9: yup.number().optional().default(0),
        vencimento10: yup.number().optional().default(0),
        vencimento11: yup.number().optional().default(0),
        vencimento12: yup.number().optional().default(0),

        tipoPagamento: yup.string().optional().default('').max(30),
        comissaoValor: yup.boolean().optional().default(false),
        comissao: yup.number().optional().default(0),
        valor: yup.number().optional().default(0),
        vendedorId: yup.number().optional().default(0),

        // Mensagens
        mensagemId: yup.number().optional().default(0),
        
        mensagemImpressao: yup.string().optional().default('').max(8000),
        informacoesAdicionais: yup.string().optional().default('').max(8000),
        observacoesInternas: yup.string().optional().default('').max(8000),

        empresaId: yup.number().optional().default(0),
        usuarioId: yup.number().optional().default(0)     
    }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    // Adicionar usuario id e empresaId ao corpo da solicitação
    const idUser = req.headers.id;
    if (typeof idUser === 'string' && !isNaN(Number(idUser))) {
        req.body.usuarioId = parseInt(idUser);
    }
    const idEmpresa = req.headers.empresaId;
    if (typeof idEmpresa === 'string' && !isNaN(Number(idEmpresa))) {
        req.body.empresaId = parseInt(idEmpresa);
    }
       

    // Salvar no bd
    const result = await PedidosVendasProvider.create(req.body);
    

    // Se der errado
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    
    // se der ok
    return res.status(StatusCodes.CREATED).json(result);
};
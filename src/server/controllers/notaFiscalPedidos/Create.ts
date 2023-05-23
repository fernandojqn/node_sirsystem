import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { INotaFiscalPedidos } from '../../database/models';
import { NotaFiscalPedidosProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<INotaFiscalPedidos, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        numeroPedido: yup.number().optional().default(0),
        dataEmissao: yup.string().optional().max(10).default(''),
        status: yup.string().optional().max(3).default(''),
        pedidoCliente: yup.string().optional().max(20).default(''),
        prazoEntrega: yup.string().optional().max(10).default(''),
        garantia: yup.string().optional().max(20).default(''),
        validadeProposta: yup.string().optional().max(20).default(''),
        clienteId: yup.number().optional().default(0),
        nomeCliente: yup.string().optional().max(50).default(''),
        naturezaOperacaoCFOP: yup.string().optional().max(4).default(''),
        tipoDocumento: yup.boolean().optional().default(false),
        consumoInterno: yup.boolean().optional().default(false),
        finalidadeNormal: yup.boolean().optional().default(false),
        finalidadeComplementar: yup.boolean().optional().default(false),
        finalidadeAjuste: yup.boolean().optional().default(false),
        finalidadeDevolucao: yup.boolean().optional().default(false),
        consumidorFinal: yup.boolean().optional().default(false),
        chaveNFeDevolucao1: yup.string().optional().max(22).default(''),
        chaveNFeDevolucao2: yup.string().optional().max(22).default(''),
        chaveNFeDevolucao3: yup.string().optional().max(22).default(''),
        chaveNFeDevolucao4: yup.string().optional().max(22).default(''),
        dataLiberacao: yup.string().optional().max(10).default(''),
        totalNota: yup.number().optional().default(0),
        dataFaturamento: yup.string().optional().max(10).default(''),
        nfe: yup.string().optional().max(30).default(''),
        chaveNFe: yup.string().optional().max(30).default(''),
        protocolo: yup.string().optional().max(30).default(''),
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
    const result = await NotaFiscalPedidosProvider.create(req.body);
    

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
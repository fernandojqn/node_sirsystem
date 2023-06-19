import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IPedidosVendasTotais } from '../../database/models';
import { PedidosVendasTotaisProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<IPedidosVendasTotais, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        pedidoId: yup.number().optional().default(0),
        
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
    const result = await PedidosVendasTotaisProvider.create(req.body);    

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
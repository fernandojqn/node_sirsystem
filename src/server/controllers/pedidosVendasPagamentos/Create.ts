import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IPedidosVendasPagamentos } from '../../database/models';
import { PedidosVendasPagamentosProvider } from '../../database/providers';


//Validação
interface IBodyProps extends Omit<IPedidosVendasPagamentos, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        pedidoId: yup.number().optional().default(0),
        
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
    const result = await PedidosVendasPagamentosProvider.create(req.body);
    

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
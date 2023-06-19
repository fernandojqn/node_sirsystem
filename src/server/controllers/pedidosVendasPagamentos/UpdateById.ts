import { Request, Response } from 'express';
import { IPedidosVendasPagamentos } from '../../database/models';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PedidosVendasPagamentosProvider } from '../../database/providers';

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IPedidosVendasPagamentos, 'id'> { }

export const updateByIdValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
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
    })),
    params: get<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    
    // Adicionar usuario id e empresaId ao corpo da solicitação
    const idUser = req.headers.id;
    if (typeof idUser === 'string' && !isNaN(Number(idUser))) {
        req.body.usuarioId = parseInt(idUser);
    }
    const idEmpresa = req.headers.empresaId;
    if (typeof idEmpresa === 'string' && !isNaN(Number(idEmpresa))) {
        req.body.empresaId = parseInt(idEmpresa);
    }    
    
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    }

    const result = await PedidosVendasPagamentosProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
};
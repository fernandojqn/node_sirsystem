import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PedidosVendasProdutosProvider } from '../../database/providers';

//Validação
interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    pedido?: number;
    filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        id: yup.number().integer().optional().default(0),
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
        pedido: yup.number().integer().optional().default(0),
    }))
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const result = await PedidosVendasProdutosProvider.getAll(
        req.query.page || 1, 
        req.query.limit || 7, 
        req.query.filter || '',
        Number(req.query.id),
        Number(req.headers.empresaId));
    
    const count = await PedidosVendasProdutosProvider.count(req.query.filter);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });
    } else if (count instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message }
        });
    }

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    return res.status(StatusCodes.OK).json(result);
};
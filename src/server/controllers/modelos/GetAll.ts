import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { ModelosProvider } from '../../database/providers';
//Validação
interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
    filter2?: string;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        id: yup.number().integer().optional().default(0),
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional().default(''),
        filter2: yup.string().optional().default('')
    }))
}));



export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const result = await ModelosProvider.getAll(
        req.query.page || 1, 
        req.query.limit || 7, 
        req.query.filter || '', 
        req.query.filter2 || '',
        Number(req.headers.empresaId));

    console.log(req.query.filter2);

    
    const count = await ModelosProvider.count(req.query.filter2);

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
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { ITipo } from '../../database/models';
import { TiposProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<ITipo, 'id' | 'empresaId' | 'usuarioId'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        tipoDescricao: yup.string().required().min(3).max(50)
    }))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    
    // Salvar no bd
    const result = await TiposProvider.create(req.body);
    
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
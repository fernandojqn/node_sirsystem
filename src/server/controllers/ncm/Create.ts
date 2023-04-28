import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { INcm } from '../../database/models';
import { NcmProvider } from '../../database/providers';


//Validação
interface IBodyProps extends Omit<INcm, 'id' | 'empresaId' | 'usuarioId'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        ncmNumero: yup.string().required().min(8).max(8),
        ncmDescricao: yup.string().required().min(3).max(100),
        cestNumero: yup.string().required().min(7).max(7),
    }))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    
    // Salvar no bd
    const result = await NcmProvider.create(req.body);
    
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
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IAtividade } from '../../database/models';
import { AtividadesProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<IAtividade, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        atividade: yup.string().required().min(3).max(150),
    }))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await AtividadesProvider.create(req.body);
    // se der errado
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
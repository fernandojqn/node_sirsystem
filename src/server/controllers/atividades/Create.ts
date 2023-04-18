import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IAtividade } from '../../database/models';

//Validação
interface IBodyProps extends Omit<IAtividade, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        atividade: yup.string().required().min(3),
    }))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  
    

    return res.status(StatusCodes.CREATED).json(1);
};
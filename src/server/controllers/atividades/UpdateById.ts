import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';


//Validação
interface IAtividades {
    atividade: string;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IAtividades>(yup.object().shape({
        atividade: yup.string().required().min(3),
    }))
}));


export const create = async (req: Request<{}, {}, IAtividades>, res: Response) => {
  
    console.log(req.body);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';


//Validação
interface IParamProps {
    id?: number;    
}

interface IBodyProps {
    atividade: string;
}

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        atividade: yup.string().required().min(3),
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),        
    }))
}));


export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    console.log(req.params);
    console.log(req.body);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};
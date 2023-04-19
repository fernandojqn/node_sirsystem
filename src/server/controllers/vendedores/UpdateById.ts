import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IAtividade } from '../../database/models';


//Validação
interface IParamProps {
    id?: number;    
}

interface IBodyProps extends Omit<IAtividade, 'id'> {
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
    if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: 'Registro não encontrado'
        }
    });
    
    return res.status(StatusCodes.NO_CONTENT).send();
};
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';


//Validação
interface IParamProps {
    id?: number;    
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),        
    }))
}));


export const getById = async (req: Request<IParamProps>, res: Response) => {
  
    if (Number(req.params.id) === 999999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: 'Registro não encontrado'
        }
    });
    
    return res.status(StatusCodes.OK).json({
        id: req.params.id,
        atividade: 'comercio',
    });
};
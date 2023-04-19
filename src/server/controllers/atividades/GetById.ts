import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { AtividadesProvider } from '../../database/providers';


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
    
    if (!req.params.id) {//verifica se o id foi informado se não é undefined
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: { 
                default: 'O parametro id tem que ser informado'
            }
        });
    }

    //Faz ação no bd
    const result = await AtividadesProvider.getById(req.params.id);

    //Verifica erro no bd
    if(result instanceof Error) {//Se der erro durante ação no bd
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { 
                default: result.message
            }
        });
    }

    //me retorna os dados 
    return res.status(StatusCodes.OK).json(result);
};
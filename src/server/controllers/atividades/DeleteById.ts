import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { AtividadesProvider } from '../../database/providers';


//Validação
interface IParamProps {
    id?: number;    
}

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),        
    }))
}));


export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  
    if(!req.params.id) { // Se o id for undefined, não existir 
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: { 
                default: 'O parametro id tem que ser informado'
            }
        });
    }

    // faz ação no bd
    const result = await AtividadesProvider.deleteById(req.params.id);

    if(result instanceof Error) {//Se der erro durante ação no bd
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { 
                default: result.message
            }
        });
    }

    //tudo ok manda o resultado vazio
    return res.status(StatusCodes.NO_CONTENT).send();
};
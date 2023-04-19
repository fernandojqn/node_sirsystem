import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IAtividade } from '../../database/models';
import { AtividadesProvider } from '../../database/providers';


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
    if (!req.params.id) {//verifica se o id foi informado se não é undefined
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: { 
                default: 'O parametro id tem que ser informado'
            }
        });
    }

    //faz ação no bd
    const result = await AtividadesProvider.UpdateById(req.params.id, req.body);

    //Verifica erro no bd
    if(result instanceof Error) {//Se der erro durante ação no bd
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { 
                default: result.message
            }
        });
    }

    //Retorna para o front
    return res.status(StatusCodes.NO_CONTENT).json(result);
};
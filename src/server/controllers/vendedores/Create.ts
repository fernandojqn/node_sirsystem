import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { VendedoresProvider } from '../../database/providers';
import { IVendedor } from '../../database/models';

//Validação
interface IBodyProps extends Omit<IVendedor, 'id'> {}

export const createValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
      nome: yup.number().integer().required().min(3).max(150),
      tipoEmpresa: yup.string().required().min(3),
    })),
  }));
    

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    
    // Salvar no bd
    const result = await VendedoresProvider.create(req.body);
    
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
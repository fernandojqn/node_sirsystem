import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IGrupo } from '../../database/models';
import { GruposProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<IGrupo, 'id' | 'empresaId' | 'usuarioId'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        grupoDescricao: yup.string().required().min(3).max(50),
        produtoAcabado: yup.boolean().optional().default(false),
        materiaPrima: yup.boolean().optional().default(false),
        ncmId: yup.number().optional().default(0),
        icms: yup.number().optional().default(0),
        ipi: yup.number().optional().default(0),
        comissao: yup.number().optional().default(0),
        valorMinimoPraticado: yup.number().optional().default(0)
    }))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    
    // Salvar no bd
    const result = await GruposProvider.create(req.body);
    
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
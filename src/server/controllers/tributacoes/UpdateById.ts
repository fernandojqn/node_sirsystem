import { Request, Response } from 'express';
import { ITributacao } from '../../database/models';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { TributacoesProvider } from '../../database/providers';


interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<ITributacao, 'id' | 'empresaId' | 'usuarioId'> { }

export const updateByIdValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
        regra: yup.string().required().min(3).max(50),
        cfop: yup.string().optional().min(4).max(4).default(''),
        cst: yup.string().optional().min(3).max(3).default(''),
        ncmId: yup.number().optional().default(0),
        uf: yup.string().optional().min(2).max(2).default(''),
        icms: yup.number().optional().default(0),
        ipi: yup.number().optional().default(0),
        pis: yup.number().optional().default(0),
        cofins: yup.number().optional().default(0),
        csll: yup.number().optional().default(0),
        irrf: yup.number().optional().default(0),
        inss: yup.number().optional().default(0),
        iss: yup.number().optional().default(0),
        anp: yup.number().optional().default(0),
        ibpt: yup.number().optional().default(0)
    })),
    params: get<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    }

    const result = await TributacoesProvider.updateById(req.params.id, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
};
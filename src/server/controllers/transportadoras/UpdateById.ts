import { Request, Response } from 'express';
import { ITransportadora } from '../../database/models';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { TransportadorasProvider } from '../../database/providers';


interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<ITransportadora, 'id'> { }

export const updateByIdValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
        sufixo: yup.string().required().min(3).max(50),
        tipoEmpresa: yup.string().optional().min(1).max(4).default(''),
        documento: yup.string().optional().min(3).max(20).default(''),
        inscricao: yup.string().optional().min(3).max(20).default(''),
        
        contato: yup.string().optional().min(3).max(50).default(''),
        telefone: yup.string().optional().min(3).max(15).default(''),
        celular: yup.string().optional().min(3).max(15).default(''),
        email: yup.string().optional().min(5).max(50).default('').email(),
        site: yup.string().optional().min(3).max(50).default(''),
        
        endereco: yup.string().optional().min(3).max(50).default(''),
        numero: yup.string().optional().min(3).max(10).default(''),
        complemento: yup.string().optional().min(3).max(50).default(''),
        bairro: yup.string().optional().min(3).max(50).default(''),
        cidade: yup.string().optional().min(3).max(50).default(''),
        uf: yup.string().optional().min(2).max(2).default(''),
        cep: yup.string().optional().min(3).max(10).default(''),
        pais: yup.string().optional().min(3).max(50).default(''),
        municipio: yup.string().optional().min(7).max(7).default('')
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

    const result = await TransportadorasProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
};
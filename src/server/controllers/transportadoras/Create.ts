import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { ITransportadora } from '../../database/models';
import { TransportadorasProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<ITransportadora, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
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
    }))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    
    // Salvar no bd
    const result = await TransportadorasProvider.create(req.body);
    
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
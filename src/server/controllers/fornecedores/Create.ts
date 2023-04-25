import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IFornecedor } from '../../database/models';
import { FornecedoresProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<IFornecedor, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        sufixo: yup.string().required().min(3).max(50),
        nome: yup.string().required().max(50).default(''),
        tipoEmpresa: yup.string().optional().max(4).default(''),
        documento: yup.string().optional().max(20).default(''),
        inscricao: yup.string().optional().max(20).default(''),
        ccm: yup.string().optional().max(20).default(''),
        
        contato: yup.string().optional().max(50).default(''),
        telefone: yup.string().optional().max(15).default(''),
        celular: yup.string().optional().max(15).default(''),
        email: yup.string().optional().max(50).default('').email(),
        site: yup.string().optional().max(50).default(''),
        
        endereco: yup.string().optional().max(50).default(''),
        numero: yup.string().optional().max(10).default(''),
        complemento: yup.string().optional().max(50).default(''),
        bairro: yup.string().optional().max(50).default(''),
        cidade: yup.string().optional().max(50).default(''),
        uf: yup.string().optional().max(2).default(''),
        cep: yup.string().optional().max(10).default(''),
        pais: yup.string().optional().max(50).default(''),
        municipio: yup.string().optional().max(7).default(''),

        cliente: yup.boolean().optional().default(false),
        idCliente: yup.number().optional().default(0)
    }))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    
    // Salvar no bd
    const result = await FornecedoresProvider.create(req.body);
    
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
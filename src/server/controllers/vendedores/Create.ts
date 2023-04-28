import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { VendedoresProvider } from './../../database/providers';
import { IVendedor } from './../../database/models';
import { validation } from '../../shared/middlewares';


interface IBodyProps extends Omit<IVendedor, 'id' | 'empresaId' | 'usuarioId'> { }

export const createValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3).max(50),
        sufixo: yup.string().optional().max(50).default(''),
        tipoEmpresa: yup.string().optional().default('').max(10),
        documento: yup.string().optional().default('').max(20),
        inscricaoEstadual: yup.string().optional().default('').max(20),
        telefone: yup.string().optional().default('').max(15),
        celular: yup.string().optional().default('').max(15),
        email: yup.string().email().optional().default('').max(100),
        site: yup.string().optional().default('').max(100),

        endereco: yup.string().optional().default('').max(150), 
        numero: yup.string().optional().default('').max(10), 
        complemento: yup.string().optional().default('').max(50), 
        bairro: yup.string().optional().default('').max(50), 
        cidade: yup.string().optional().default('').max(50),
        uf: yup.string().optional().default('').max(2), 
        cep: yup.string().optional().default('').max(10), 
        pais: yup.string().optional().default('').max(50), 
        codMunicipal: yup.string().optional().default('').max(7),

        comissao: yup.number().optional().default(0), 
        irpf: yup.number().optional().default(0), 
        banco: yup.string().optional().default('').max(20), 
        agencia: yup.string().optional().default('').max(20), 
        conta: yup.string().optional().default('').max(20), 
        pix: yup.string().optional().default('').max(50),
        obs: yup.string().optional().default('').max(8000),
    })),
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const result = await VendedoresProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};
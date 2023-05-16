import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { VendedoresProvider } from './../../database/providers';
import { IVendedor } from './../../database/models';
import { validation } from '../../shared/middlewares';


interface IBodyProps extends Omit<IVendedor, 'id'> { }

export const createValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3).max(50),
        sufixo: yup.string().optional().max(50).default(''),
        tipoEmpresa: yup.string().optional().default('').max(10),
        documento: yup.string().optional().default('').max(18),
        inscricaoEstadual: yup.string().optional().default('').max(14),
        telefone: yup.string().optional().default('').max(15),
        celular: yup.string().optional().default('').max(15),
        email: yup.string().email().optional().default('').max(50),
        site: yup.string().optional().default('').max(50),

        endereco: yup.string().optional().default('').max(60), 
        numero: yup.string().optional().default('').max(6), 
        complemento: yup.string().optional().default('').max(20), 
        bairro: yup.string().optional().default('').max(60), 
        cidade: yup.string().optional().default('').max(40),
        uf: yup.string().optional().default('').max(2), 
        cep: yup.string().optional().default('').max(9), 
        pais: yup.string().optional().default('').max(25), 
        codMunicipal: yup.string().optional().default('').max(7),

        comissao: yup.number().optional().default(0), 
        irpf: yup.number().optional().default(0), 
        banco: yup.string().optional().default('').max(20), 
        agencia: yup.string().optional().default('').max(10), 
        conta: yup.string().optional().default('').max(15), 
        pix: yup.string().optional().default('').max(50),
        obs: yup.string().optional().default('').max(8000),
        empresaId: yup.number().optional().default(0),
        usuarioId: yup.number().optional().default(0)
    })),
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    // Adicionar usuario id e empresaId ao corpo da solicitação
    const idUser = req.headers.id;
    if (typeof idUser === 'string' && !isNaN(Number(idUser))) {
        req.body.usuarioId = parseInt(idUser);
    }
    const idEmpresa = req.headers.empresaId;
    if (typeof idEmpresa === 'string' && !isNaN(Number(idEmpresa))) {
        req.body.empresaId = parseInt(idEmpresa);
    }
    
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
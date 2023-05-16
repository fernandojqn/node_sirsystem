import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { ITributacao } from '../../database/models';
import { TributacoesProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<ITributacao, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        regra: yup.string().required().min(3).max(50),
        cfop: yup.string().optional().max(4).default(''),
        cst: yup.string().optional().max(3).default(''),
        ncmId: yup.number().optional().default(0),
        uf: yup.string().optional().max(2).default(''),
        icms: yup.number().optional().default(0),
        ipi: yup.number().optional().default(0),
        pis: yup.number().optional().default(0),
        cofins: yup.number().optional().default(0),
        csll: yup.number().optional().default(0),
        irrf: yup.number().optional().default(0),
        inss: yup.number().optional().default(0),
        iss: yup.number().optional().default(0),
        anp: yup.number().optional().default(0),
        ibpt: yup.number().optional().default(0),
        empresaId: yup.number().optional().default(0),
        usuarioId: yup.number().optional().default(0)
    }))
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
    
    // Salvar no bd
    const result = await TributacoesProvider.create(req.body);
    
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
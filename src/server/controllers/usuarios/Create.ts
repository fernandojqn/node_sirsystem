import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IUsuario } from '../../database/models';
import { UsuariosProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<IUsuario, 'id' | 'senha'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3).max(50),
        email: yup.string().required().min(3).max(50).email(),
        permissoes: yup.string().optional().max(30).default(''),
        departamento: yup.string().optional().max(30).default(''),
        telefone: yup.string().optional().default(''),
        celular: yup.string().optional().default(''),
        empresaId: yup.number().optional().default(0)
    }))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    
    // Adicionar usuario id e empresaId ao corpo da solicitação
    const idEmpresa = req.headers.empresaId;
    if (typeof idEmpresa === 'string' && !isNaN(Number(idEmpresa))) {
        req.body.empresaId = parseInt(idEmpresa);
    }
    
    // Salvar no bd
    const result = await UsuariosProvider.create(req.body);
    
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
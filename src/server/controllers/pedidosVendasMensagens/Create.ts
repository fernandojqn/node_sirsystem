import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IPedidosVendasMensagens } from '../../database/models';
import { PedidosVendasMensagensProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<IPedidosVendasMensagens, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        pedidoId: yup.number().optional().default(0),
        
        mensagemId: yup.number().optional().default(0),
        
        mensagemImpressao: yup.string().optional().default('').max(8000),
        informacoesAdicionais: yup.string().optional().default('').max(8000),
        observacoesInternas: yup.string().optional().default('').max(8000),

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
    const result = await PedidosVendasMensagensProvider.create(req.body);    

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
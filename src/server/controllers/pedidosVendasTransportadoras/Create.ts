import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IPedidosVendasTransportadoras } from '../../database/models';
import { PedidosVendasTransportadorasProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<IPedidosVendasTransportadoras, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        pedidoId: yup.number().optional().default(0),
        
        transportadoraId: yup.number().optional().default(0),

        modalidadeFrete: yup.string().optional().default('').max(30),
        valorFrete: yup.number().optional().default(0),

        pesoEmbalagem: yup.number().optional().default(0),
        numeroCaixa: yup.number().optional().default(0),
        quantidade: yup.number().optional().default(0),
        especie: yup.string().optional().default('').max(50),
        pesoLiquido: yup.number().optional().default(0),
        pesoBruto: yup.number().optional().default(0),
        marca: yup.string().optional().default('').max(50),

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
    const result = await PedidosVendasTransportadorasProvider.create(req.body);    

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
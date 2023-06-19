import { Request, Response } from 'express';
import { IPedidosVendasTransportadoras } from '../../database/models';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PedidosVendasTransportadorasProvider } from '../../database/providers';

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IPedidosVendasTransportadoras, 'id'> { }

export const updateByIdValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
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
    })),
    params: get<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    
    // Adicionar usuario id e empresaId ao corpo da solicitação
    const idUser = req.headers.id;
    if (typeof idUser === 'string' && !isNaN(Number(idUser))) {
        req.body.usuarioId = parseInt(idUser);
    }
    const idEmpresa = req.headers.empresaId;
    if (typeof idEmpresa === 'string' && !isNaN(Number(idEmpresa))) {
        req.body.empresaId = parseInt(idEmpresa);
    }    
    
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    }

    const result = await PedidosVendasTransportadorasProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
};
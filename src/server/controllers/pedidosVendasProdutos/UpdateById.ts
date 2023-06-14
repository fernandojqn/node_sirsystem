import { Request, Response } from 'express';
import { IPedidosVendasProdutos } from '../../database/models';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PedidosVendasProdutosProvider } from '../../database/providers';

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IPedidosVendasProdutos, 'id'> {}

export const updateByIdValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
        pedidoId:  yup.number().optional().default(0),
        produtoId:  yup.number().optional().default(0),

        produto: yup.string().optional().default(''),
        descricaoDetalhada: yup.string().optional().default(''),
        
        numeroItem:  yup.number().optional().default(0),
        embalagemUnidade: yup.boolean().optional().default(false),
        quantidade:  yup.number().optional().default(0),
        
        quantidadeEmbalagem:  yup.number().optional().default(0),
        unidade: yup.string().optional().default(''),
        condicao: yup.string().optional().default(''),
        precoUnitario:  yup.number().optional().default(0),
        precoItem:  yup.number().optional().default(0),
        desconto:  yup.number().optional().default(0),
        subTotal:  yup.number().optional().default(0),
        frete:  yup.number().optional().default(0),
        seguro:  yup.number().optional().default(0),
        totalItem:  yup.number().optional().default(0),
        compoemValorTotal: yup.boolean().optional().default(false),

        pedidoCompra: yup.string().optional().default(''),
        pedidoCompraItem: yup.string().optional().default(''),
        localEstoque: yup.string().optional().default(''),
        
        empresaId:  yup.number().optional().default(0),
        usuarioId:  yup.number().optional().default(0),
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

    const result = await PedidosVendasProdutosProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
};
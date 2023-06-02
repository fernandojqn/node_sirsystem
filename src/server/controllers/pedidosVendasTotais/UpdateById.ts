import { Request, Response } from 'express';
import { IPedidosVendasTotais } from '../../database/models';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PedidosVendasTotaisProvider } from '../../database/providers';

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IPedidosVendasTotais, 'id'> { }

export const updateByIdValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
        pedidoId: yup.number().optional().default(0),    
        totalProdutosServicos: yup.number().optional().default(0),
        baseCalculo1: yup.number().optional().default(0),
        baseCalculo2: yup.number().optional().default(0),
        icmsFCP: yup.number().optional().default(0),
        icmsPartilhaRemetente: yup.number().optional().default(0),
        icmsFCPufDestino: yup.number().optional().default(0),
        totalIPI: yup.number().optional().default(0),
        devolvidoIPI: yup.number().optional().default(0),
        baseCalculoICMSst1: yup.number().optional().default(0),
        baseCalculoICMSst2: yup.number().optional().default(0),
        icmsFCPst: yup.number().optional().default(0),
        icmsSTpartilhaDestinatario: yup.number().optional().default(0),
        icmsSTdesonerado: yup.number().optional().default(0),
        totalCOFINS: yup.number().optional().default(0),
        totalPIS: yup.number().optional().default(0),
        totalFrete: yup.number().optional().default(0),
        totalDesconto: yup.number().optional().default(0),
        totalSeguro: yup.number().optional().default(0),
        totalOutros: yup.number().optional().default(0),
        totalNota: yup.number().optional().default(0),

        vistaprazo: yup.boolean().optional().default(false),
        dataVencimento: yup.string().optional().default('').max(10),
        descricaoAvista: yup.string().optional().default('').max(250),
        prazoDias1: yup.number().optional().default(0),
        prazoDias2: yup.number().optional().default(0),
        prazoDias3: yup.number().optional().default(0),
        prazoDias4: yup.number().optional().default(0),
        prazoDias5: yup.number().optional().default(0),
        prazoDias6: yup.number().optional().default(0),
        prazoDias7: yup.number().optional().default(0),
        prazoDias8: yup.number().optional().default(0),
        prazoDias9: yup.number().optional().default(0),
        prazoDias10: yup.number().optional().default(0),
        prazoDias11: yup.number().optional().default(0),
        prazoDias12: yup.number().optional().default(0),
        tipoDePagamento: yup.string().optional().default(''),
        comissaoValor: yup.boolean().optional().default(false),
        comissao: yup.number().optional().default(0),
        valor: yup.number().optional().default(0),
        vendedorId: yup.number().optional().default(0),
        transportadoraId: yup.number().optional().default(0),
        modalidadeFrete: yup.string().optional().default('').max(1),
        valorTotalFrete: yup.number().optional().default(0),
        pesoEmbalagem: yup.number().optional().default(0),
        numeroEmbalagem: yup.string().optional().default('').max(50),
        quantidadeEmbalagem: yup.number().optional().default(0),
        especieEmbalagem: yup.string().optional().default('').max(50),
        pesoLiquidoEmbalagem: yup.number().optional().default(0),
        pesoBrutoEmbalagem: yup.number().optional().default(0),
        marca: yup.string().optional().default('').max(50),
        codigoMensagemId: yup.number().optional().default(0),
        impressaoPedido: yup.string().optional().default('').max(8000),
        informacoesAdicionais: yup.string().optional().default('').max(8000),
        observacoesInternas: yup.string().optional().default('').max(8000),

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

    const result = await PedidosVendasTotaisProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
};
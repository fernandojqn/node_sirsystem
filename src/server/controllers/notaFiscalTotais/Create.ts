import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { INotaFiscalTotais } from '../../database/models';
import { NotaFiscalTotaisProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<INotaFiscalTotais, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
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
        vistaprazo: yup.boolean().optional().default(false),
        dataVencimento: yup.string().optional().max(10).default(''),
        descricaoAvista: yup.string().optional().max(100).default(''),
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
        comissaoValor: yup.boolean().optional().default(false),
        comissao: yup.number().optional().default(0),
        valor: yup.number().optional().default(0),
        vendedorId: yup.number().optional().default(0),
        transportadoraId: yup.number().optional().default(0),
        modalidadeFrete: yup.string().optional().max(1).default(''),
        valorTotalFrete: yup.number().optional().default(0),
        pesoEmbalagem: yup.number().optional().default(0),
        numeroEmbalagem: yup.string().optional().max(30).default(''),
        quantidadeEmbalagem: yup.number().optional().default(0),
        especieEmbalagem: yup.string().optional().max(30).default(''),
        pesoLiquidoEmbalagem: yup.number().optional().default(0),
        pesoBrutoEmbalagem: yup.number().optional().default(0),
        marca: yup.string().optional().max(30).default(''),
        codigoMensagemId: yup.number().optional().default(0),
        impressaoPedido: yup.string().optional().max(8000).default(''),
        informacoesAdicionais: yup.string().optional().max(8000).default(''),
        observacoesInternas: yup.string().optional().max(8000).default(''),
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
    const result = await NotaFiscalTotaisProvider.create(req.body);
    
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
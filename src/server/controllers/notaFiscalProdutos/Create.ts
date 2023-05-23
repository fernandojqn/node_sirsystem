import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { INotaFiscalProdutos } from '../../database/models';
import { NotaFiscalProdutosProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<INotaFiscalProdutos, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        pedidoId: yup.number().optional().default(0),
        produtoId: yup.number().optional().default(0),
        numeroItem: yup.number().optional().default(0),
        embalagemUnidade: yup.boolean().optional().default(false),
        quantidade: yup.number().optional().default(0),
        quantidadeEmbalagem: yup.number().optional().default(0),
        tipoEmbalagem: yup.string().optional().max(3).default(''),
        unidade: yup.number().optional().default(0),
        precoUnitario: yup.number().optional().default(0),
        precoItem: yup.number().optional().default(0),
        desconto: yup.number().optional().default(0),
        subTotal: yup.number().optional().default(0),
        frete: yup.number().optional().default(0),
        seguro: yup.number().optional().default(0),
        totalItem: yup.number().optional().default(0),
        compoemValorTotal: yup.boolean().optional().default(false),
        pedidoCompra: yup.string().optional().max(30).default(''),
        pedidoCompraItem: yup.string().optional().max(15).default(''),
        localEstoque: yup.string().optional().max(30).default(''),
        pedidoCliente: yup.string().optional().max(30).default(''),
        pedidoNFe: yup.string().optional().max(30).default(''),
        regraTributacaoId: yup.number().optional().default(0),
        cst: yup.string().optional().max(3).default(''),
        cfop: yup.string().optional().max(4).default(''),
        cest: yup.string().optional().max(7).default(''),
        ncm: yup.string().optional().max(8).default(''),
        situacaoTributariaICMS: yup.string().optional().max(3).default(''),
        origemICMS: yup.string().optional().max(3).default(''),
        baseReducaoICMS: yup.number().optional().default(0),
        reducaoICMS: yup.number().optional().default(0), 
        baseCalculoICMS: yup.number().optional().default(0),
        aliquotaICMS: yup.number().optional().default(0),
        valorICMS: yup.number().optional().default(0),
        operacaoICMS: yup.number().optional().default(0),
        diferencaICMS: yup.number().optional().default(0),
        diferidoICMS: yup.number().optional().default(0),
        reducaoICMSst: yup.number().optional().default(0),
        valorICMSst: yup.number().optional().default(0),
        mvaICMSst: yup.number().optional().default(0),
        MVAvalorICMSst: yup.number().optional().default(0),
        aliquotaICMSst: yup.number().optional().default(0),
        icmsST: yup.number().optional().default(0),
        ufICMSst: yup.string().optional().max(2).default(''),
        baseICMSfcp: yup.number().optional().default(0),
        aliquotaICMSfcp: yup.number().optional().default(0),
        icmsFCP: yup.number().optional().default(0),
        situacaoTributariaIPI: yup.string().optional().max(3).default(''),
        baseCalculoIPI: yup.number().optional().default(0),
        aliquotaIPI: yup.number().optional().default(0),
        valorIPI: yup.number().optional().default(0),
        situacaoTributariaCOFINS: yup.string().optional().max(3).default(''),
        baseCalculoCOFINS: yup.number().optional().default(0),
        aliquotaCOFINS: yup.number().optional().default(0),
        valorCOFINS: yup.number().optional().default(0),
        situacaoTributariaPIS: yup.string().optional().max(3).default(''),
        baseCalculoPIS: yup.number().optional().default(0),
        aliquotaPIS: yup.number().optional().default(0),
        valorPIS: yup.number().optional().default(0),
        porcentagemICMSrelativoFCPufDestino: yup.number().optional().default(0),
        valorBaseCalculoUFDestino: yup.number().optional().default(0),
        valorBaseCalculoFCPnaUF: yup.number().optional().default(0),
        internaUFdestino: yup.number().optional().default(0),
        interestadual: yup.number().optional().default(0),
        provisoriaPartilha: yup.number().optional().default(0),
        icmsPartilhaUFdestino: yup.number().optional().default(0),
        icmsPartilhaUFremetente: yup.number().optional().default(0),
        icmsRelativoFCPufDestino: yup.number().optional().default(0),
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
    const result = await NotaFiscalProdutosProvider.create(req.body);
    
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
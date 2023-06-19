import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IPedidosVendasProdutos } from '../../database/models';
import { PedidosVendasProdutosProvider } from '../../database/providers';


//Validação
interface IBodyProps extends Omit<IPedidosVendasProdutos, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        pedidoId:  yup.number().optional().default(0),
        produtoId:  yup.number().optional().default(0),

        codigoProduto: yup.string().optional().default(''),
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

        // Impostos //
        regraTributacaoId: yup.number().optional().default(0),
        cst: yup.string().optional().default('').max(3),
        cfop: yup.string().optional().default('').max(4),
        cest: yup.string().optional().default('').max(7),
        ncm: yup.string().optional().default('').max(8),
        //ICMS
        icmsSituacaoTributaria: yup.string().optional().default(''),
        icmsOrigem: yup.string().optional().default(''),
        icmsBaseReducao: yup.number().optional().default(0),
        icmsReducao: yup.number().optional().default(0),
        icmsBaseCalculo: yup.number().optional().default(0),
        icmsAliquota: yup.number().optional().default(0),
        icmsValor: yup.number().optional().default(0),
        icmsOperacao: yup.number().optional().default(0),
        icmsDiferencial: yup.number().optional().default(0),
        icmsDiferido: yup.number().optional().default(0),
        //ICMS ST
        icmsSTReducao: yup.number().optional().default(0),
        icmsSTValor: yup.number().optional().default(0),
        icmsSTmva: yup.number().optional().default(0),
        icmsSTmvaValor: yup.number().optional().default(0),
        icmsSTAliquota: yup.number().optional().default(0),
        icmsSTAliquotaValor: yup.number().optional().default(0),
        icmsSTuf: yup.string().optional().default(''),
        //FCP
        fcpBase: yup.number().optional().default(0),
        fcpAliquota: yup.number().optional().default(0),
        fcpValor: yup.number().optional().default(0),
        // IPI
        ipiSituacaoTributaria: yup.string().optional().default(''),
        ipiBase: yup.number().optional().default(0),
        ipiAliquota: yup.number().optional().default(0),
        ipiValor: yup.number().optional().default(0),
        //Cofins
        cofinsSituacaoTribunal: yup.string().optional().default(''),
        cofinsBase: yup.number().optional().default(0),
        cofinsAliquota: yup.number().optional().default(0),
        cofinsValor: yup.number().optional().default(0),
        //PIS
        pisSituacaoTribunal: yup.string().optional().default(''),
        pisBase: yup.number().optional().default(0),
        pisAliquota: yup.number().optional().default(0),
        pisValor: yup.number().optional().default(0),
        //ICMS-Estadual
        icmsRelativo: yup.number().optional().default(0),
        baseCalculo: yup.number().optional().default(0),
        baseCalculoFCP: yup.number().optional().default(0),
        internaUFdestino: yup.number().optional().default(0),
        interestadual: yup.number().optional().default(0),
        provisoriaPartilha: yup.number().optional().default(0),
        icmsDestino: yup.number().optional().default(0),
        icmsRemetente: yup.number().optional().default(0),
        icmsFCPdestino: yup.number().optional().default(0),
        
        empresaId:  yup.number().optional().default(0),
        usuarioId:  yup.number().optional().default(0),   
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
    const result = await PedidosVendasProdutosProvider.create(req.body);    

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
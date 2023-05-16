import { Request, Response } from 'express';
import { IProduto } from '../../database/models';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { ProdutosProvider } from '../../database/providers';


interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IProduto, 'id'> { }

export const updateByIdValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
        produto: yup.string().required().min(3).max(50),
        codigoProduto: yup.string().required().max(13),
        ean: yup.string().required().max(13).default(''),

        grupoId: yup.number().optional().default(0),
        tipoId: yup.number().optional().default(0),
        subId: yup.number().optional().default(0),
        modeloId: yup.number().optional().default(0),
        
        descricaoDetalhada: yup.string().optional().max(100).default(''),
        origem: yup.string().optional().max(1).default(''), 
        cfop: yup.string().optional().max(4).default(''), 
        cstVendas: yup.string().optional().max(3).default(''), 
        escrituracao: yup.string().optional().max(2).default(''), 
        
        ncmId: yup.number().optional().default(0),
        
        embalagem: yup.string().optional().max(3).default(''),
        quantidadeEmbalagem: yup.number().optional().default(0),
        unidade: yup.string().optional().max(2).default(''),
        liquido: yup.number().optional().default(0),
        bruto: yup.number().optional().default(0),
        
        fornecedor1Id: yup.number().optional().default(0),
        fornecedor2Id: yup.number().optional().default(0),
        fornecedor3Id: yup.number().optional().default(0),

        codigoFabricante: yup.string().optional().max(20).default(''),
        dataUltimaCompra: yup.string().optional().max(10).default(''),
        nfe: yup.string().optional().max(50).default(''),
        
        produtoAtivo: yup.boolean().optional().default(false),
        produtoAcabado: yup.boolean().optional().default(false), 
        proprio: yup.boolean().optional().default(false), 
        terceiros: yup.boolean().optional().default(false), 
        receita: yup.boolean().optional().default(false), 
        paraVenda: yup.boolean().optional().default(false), 
        paraCompra: yup.boolean().optional().default(false), 
        outro: yup.boolean().optional().default(false), 
        descricaoOutro: yup.string().optional().max(20).default(''),
        
        promocao: yup.boolean().optional().default(false),  
        moeda: yup.string().optional().max(10).default(''),
        precoCusto: yup.number().optional().default(0), 
        capagem: yup.number().optional().default(0), 
        precoCompra: yup.number().optional().default(0),
        
        margemLucro1: yup.number().optional().default(0), 
        margemLucro2: yup.number().optional().default(0), 
        margemLucro3: yup.number().optional().default(0), 
        margemLucro4: yup.number().optional().default(0), 
        margemLucro5: yup.number().optional().default(0),
        condicao1: yup.string().optional().max(20).default(''), 
        condicao2: yup.string().optional().max(20).default(''), 
        condicao3: yup.string().optional().max(20).default(''), 
        condicao4: yup.string().optional().max(20).default(''), 
        condicao5: yup.string().optional().max(20).default(''), 
        precoVenda1: yup.number().optional().default(0), 
        precoVenda2: yup.number().optional().default(0), 
        precoVenda3: yup.number().optional().default(0), 
        precoVenda4: yup.number().optional().default(0), 
        precoVenda5: yup.number().optional().default(0),
        
        ipiCompra: yup.number().optional().default(0), 
        ipiVenda: yup.number().optional().default(0), 
        icmsCompra: yup.number().optional().default(0), 
        icmsVenda: yup.number().optional().default(0), 
        pis: yup.number().optional().default(0), 
        cofins: yup.number().optional().default(0), 
        baseCalculoReduzida: yup.boolean().optional().default(false), 
        porcentagemReducao: yup.number().optional().default(0), 
        comissaoDiferenciada: yup.boolean().optional().default(false), 
        porcentagemComissao: yup.number().optional().default(0),
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

    const result = await ProdutosProvider.updateById(req.params.id, req.body);
    
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
};
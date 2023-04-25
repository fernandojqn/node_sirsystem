import { Request, Response } from 'express';
import { IEmpresa } from '../../database/models';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { EmpresasProvider } from '../../database/providers';


interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IEmpresa, 'id'> { }

export const updateByIdValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
        sufixo: yup.string().required().min(3).max(50),
        nome: yup.string().required().max(50).default(''),
        tipoEmpresa: yup.string().optional().max(4).default(''),
        documento: yup.string().optional().max(20).default(''),
        inscricao: yup.string().optional().max(20).default(''),
        ccm: yup.string().optional().max(20).default(''),
        
        contato: yup.string().optional().max(50).default(''),
        telefone: yup.string().optional().max(15).default(''),
        celular: yup.string().optional().max(15).default(''),
        email: yup.string().optional().max(50).default('').email(),
        site: yup.string().optional().max(50).default(''),
        
        endereco: yup.string().optional().max(50).default(''),
        numero: yup.string().optional().max(10).default(''),
        complemento: yup.string().optional().max(50).default(''),
        bairro: yup.string().optional().max(50).default(''),
        cidade: yup.string().optional().max(50).default(''),
        uf: yup.string().optional().max(2).default(''),
        cep: yup.string().optional().max(10).default(''),
        pais: yup.string().optional().max(50).default(''),
        municipio: yup.string().optional().max(7).default(''),

        unidade: yup.string().optional().max(50).default(''),
        nomeUnidade: yup.string().optional().max(2).default(''),
        modeloCF: yup.string().optional().max(50).default(''),
        numSerie: yup.string().optional().max(50).default(''),
        obs: yup.string().optional().max(8000).default(''),
        obsFisco: yup.string().optional().max(8000).default(''),
        
        codigoNatureza: yup.string().optional().max(50).default(''),
        modeloNF: yup.string().optional().max(50).default(''),
        serie: yup.string().optional().max(50).default(''),
        optanteSN: yup.boolean().optional().default(false),
        aliquotaICMS: yup.number().optional().default(0),
        aliquotaCOFINS: yup.number().optional().default(0),
        aliquotaPIS: yup.number().optional().default(0),
        perfil: yup.string().optional().max(1).default(''),

        tipoRegime: yup.string().optional().max(50).default(''),        
        criterioEscritura: yup.string().optional().max(50).default(''),        
        apropriacaoCredito: yup.string().optional().max(50).default(''),        
        tipoContribuicao: yup.string().optional().max(50).default(''),        
        codigoEstrutura: yup.string().optional().max(50).default(''),        
        codigoOperacao: yup.string().optional().max(50).default('')     
    })),
    params: get<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    }

    const result = await EmpresasProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
};
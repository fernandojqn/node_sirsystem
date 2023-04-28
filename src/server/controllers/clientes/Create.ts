import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { ICliente } from '../../database/models';
import { ClientesProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<ICliente, 'id' | 'empresaId' | 'usuarioId'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        sufixo: yup.string().required().min(3).max(50),
        nome: yup.string().required().max(50).default(''),
        tipoEmpresa: yup.string().optional().max(4).default(''),
        documento: yup.string().optional().max(18).default(''),
        inscricaoEstadual: yup.string().optional().max(14).default(''),
        ccm: yup.string().optional().max(12).default(''),
        
        contato: yup.string().optional().max(50).default(''),
        telefone: yup.string().optional().max(15).default(''),
        celular: yup.string().optional().max(15).default(''),
        email: yup.string().optional().max(50).default('').email(),
        site: yup.string().optional().max(50).default(''),
        
        endereco: yup.string().optional().max(60).default(''),
        numero: yup.string().optional().max(6).default(''),
        complemento: yup.string().optional().max(20).default(''),
        bairro: yup.string().optional().max(60).default(''),
        cidade: yup.string().optional().max(40).default(''),
        uf: yup.string().optional().max(2).default(''),
        cep: yup.string().optional().max(9).default(''),
        pais: yup.string().optional().max(25).default(''),
        codMunicipal: yup.string().optional().max(7).default(''),
        
        enderecoEnt: yup.string().optional().max(60).default(''),
        numeroEnt: yup.string().optional().max(6).default(''),
        complementoEnt: yup.string().optional().max(20).default(''),
        bairroEnt: yup.string().optional().max(60).default(''),
        cidadeEnt: yup.string().optional().max(40).default(''),
        ufEnt: yup.string().optional().max(2).default(''),
        cepEnt: yup.string().optional().max(9).default(''),
        paisEnt: yup.string().optional().max(25).default(''),
        codMunicipalEnt: yup.string().optional().max(7).default(''),
        
        enderecoCor: yup.string().optional().max(60).default(''),
        numeroCor: yup.string().optional().max(6).default(''),
        complementoCor: yup.string().optional().max(20).default(''),
        bairroCor: yup.string().optional().max(60).default(''),
        cidadeCor: yup.string().optional().max(40).default(''),
        ufCor: yup.string().optional().max(2).default(''),
        cepCor: yup.string().optional().max(9).default(''),
        paisCor: yup.string().optional().max(25).default(''),
        codMunicipalCor: yup.string().optional().max(7).default(''),

        pagamento1: yup.string().optional().max(20).default(''),
        pagamento2: yup.string().optional().max(20).default(''),
        pagamento3: yup.string().optional().max(20).default(''),
        pagamento4: yup.string().optional().max(20).default(''),
        pagamento5: yup.string().optional().max(20).default(''),
        pagamento6: yup.string().optional().max(20).default(''),
        desconto1: yup.number().optional().default(0),
        desconto2: yup.number().optional().default(0),
        desconto3: yup.number().optional().default(0),
        obs: yup.string().optional().max(8000).default(''),

        atividadeId: yup.number().optional().default(0),
        vendedorId: yup.number().optional().default(0),
        
        cofins: yup.number().optional().default(0),
        pis: yup.number().optional().default(0),
        icms: yup.number().optional().default(0),
        ipi: yup.number().optional().default(0),
        simplesNascional: yup.boolean().optional().default(false),
        retemISS: yup.boolean().optional().default(false)
    }))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    
    // Salvar no bd
    const result = await ClientesProvider.create(req.body);
    
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
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IUsuario } from '../../database/models';
import { UsuariosProvider } from '../../database/providers';

//Validação
interface IBodyProps extends Omit<IUsuario, 'id' | 'nome' | 'permissoes' | 'departamento' | 
        'telefone' | 'celular'> {}

export const singInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().min(3).max(50).email(),
        senha: yup.string().required().min(6)
    }))
}));


export const singIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    
    // desestruturo o IBoryProps
    const {email, senha } = req.body;

    //Pesquiso no banco pelo email
    const result = await UsuariosProvider.getByEmail(email);
    
    // Se não encontrar o email
    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha são inválidos'
            }
        });
    }

    // Se a senha estiver errada
    if (senha !== result.senha) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha são inválidos'
            }
        });    
    } else { //Se for igual
        return res.status(StatusCodes.OK).json({ acessToken: 'teste.teste.teste'});
    }
};
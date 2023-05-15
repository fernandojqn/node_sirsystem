import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { IUsuario } from '../../database/models';
import { UsuariosProvider } from '../../database/providers';
import { JWTService, PasswordCrypto } from '../../shared/services';

//Validação
interface IBodyProps extends Omit<IUsuario, 'id' | 'nome' | 'permissoes' | 'departamento' | 
        'telefone' | 'celular' | 'empresaId'> {}

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
    const usuario = await UsuariosProvider.getByEmail(email);
    
    // Se não encontrar o email
    if (usuario instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha são inválidos'
            }
        });
        
    } 

    const passwordMatch = await PasswordCrypto.verifyPassword(senha, usuario.senha);

    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha são inválidos'
            }
        });
    } else {

        const accessToken = JWTService.sign({ 
            uid: usuario.id, 
            nome: usuario.nome, 
            permissoes: usuario.permissoes,
            empresaId: usuario.empresaId });
    
        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Erro ao gerar o token de acesso'
                }
            });
        }

        return res.status(StatusCodes.OK).json({ accessToken });
    }
    
};
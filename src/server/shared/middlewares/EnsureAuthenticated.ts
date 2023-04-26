import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWTService } from '../services';


export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers; // Extrair do headers o autorization

    if (!authorization) { // se não tiver um token de autorizaçao
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autenticado' }
        });
    }
    
    // tipo do token (Bearer, token em si) o split ele reconhece pela separação
    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') { //Valida se o tipo do token está correto
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autenticado' }
        });
    }


    const jwtData = JWTService.verify(token); // só passar o token para o verificador
    
    if (jwtData === 'JWT_SECRET_NOT_FOUND') { //se ele é uma msg de erro
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: 'Erro ao verificar o token' }
        });
    } else if (jwtData === 'INVALID_TOKEN') { // se a msg de erro for um tolken invalido
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autenticado' }
        });
    }

    //resgatar o id do usuario no jwt
    req.headers.idUsuario = jwtData.uid.toString();
    // em qualquer controller req.headers.idUsuario

    return next();
};
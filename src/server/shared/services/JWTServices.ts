import * as jwt from 'jsonwebtoken';


interface IJwtData {
  uid: number; //passar o ID de usuario
  nome: string;
  permissoes: string;
  empresaId: number;
}

const sign = (data: IJwtData): string | 'JWT_SECRET_NOT_FOUND' => {
    
    if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND'; //Se não conseguir encontrar o JWT

    //Primeira coisa que passa é a data (informações), depois o segredo, expired em 24h
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verify = (token: string): IJwtData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
    if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND'; //Se não conseguir encontrar o JWT

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //validar o token sendo gerado
        if (typeof decoded === 'string') { // se vim string é porque não conseguiu validar o token
            return 'INVALID_TOKEN';
        }

        return decoded as IJwtData; // Indentifica que é o IJWT para pegar os dados de dentro
    } catch (error) {
        return 'INVALID_TOKEN';
    }
};

export const JWTService = { //Exportar os metodos
    sign,
    verify,
};
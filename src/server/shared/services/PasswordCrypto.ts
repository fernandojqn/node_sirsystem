import { genSalt, hash, compare } from 'bcryptjs';


//essa variavel é por porcentagem o quanto mais caracteries, embaralhar a senha
//complicar a senha
const SALT_RANDOMS = 10; 

//Criptografar a senha
const hashPassword = async (password: string) => {
    const saltGenerated = await genSalt(SALT_RANDOMS); // gerar a complixidade da senha

    return await hash(password, saltGenerated); // retorna a senha com crypto (coloca a senha na crypto)
};

//verificar a senha
const verifyPassword = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword); // retorna um boolean (recebe a senha e uma hash)
};


export const PasswordCrypto = {
    hashPassword,
    verifyPassword,
};
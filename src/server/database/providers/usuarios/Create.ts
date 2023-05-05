import { PasswordCrypto } from '../../../shared/services';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';


export const create = async (usuario: Omit<IUsuario, 'id' | 'senha' | 'empresaId' | 'usuarioId'>): Promise<object | number | Error> => {

    try {
        //Gerando crypto para senha
        const hashedPassword = await PasswordCrypto.hashPassword('12345678');  //usuario.senha

        const [result] = await Knex(ETableNames.usuarios)
            .insert({...usuario, senha: hashedPassword})
            .returning('id');

        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
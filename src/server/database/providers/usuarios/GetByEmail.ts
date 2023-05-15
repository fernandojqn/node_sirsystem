import { ETableNames } from '../../ETableNames';
import { IUsuario } from '../../models';
import { Knex } from '../../knex';

export const getByEmail = async (email: string): Promise<IUsuario | Error> => {

    try {
        const result = await Knex(ETableNames.usuarios)
            .select('*')
            .where('email', '=', email)
            .first(); // só quero o primeiro da lista, ele para de procurar no bd

        if(result) return result;


        return new Error('Registro não encontrado');
    } catch (error) {
        return new Error('Erro ao consultar o registro');
    }
};
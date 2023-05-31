import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IEmpresa } from '../../models';

export const create = async (empresa: Omit<IEmpresa, 'id' | 'usuarioId'>): Promise<object | number | Error> => {

    try {
        const [result] = await Knex(ETableNames.empresas)
            .insert(empresa)
            .returning('id');

        return result;          

    } catch (error) {
        return new Error('Erro ao cadastrar o registro!!!!');
    }
};
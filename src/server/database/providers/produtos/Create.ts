import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IProduto } from '../../models';


export const create = async (produto: Omit<IProduto, 'id' | 'empresaId' | 'usuarioId'>): Promise<number | Error> => {

    try {
        const [result] = await Knex(ETableNames.produtos)
            .insert(produto)
            .returning('id');

        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }


        return new Error('Erro ao cadastrar o registro');
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
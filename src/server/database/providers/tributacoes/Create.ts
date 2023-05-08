import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITributacao } from '../../models';


export const create = async (tributacao: Omit<ITributacao, 'id' | 'empresaId' | 'usuarioId'>): Promise<object | number | Error> => {

    try {
        // os IFs são para quando deixar o cbos em branco ele tira os
        // campos do form para salvar nulo
        if (tributacao.ncmId === 0) {
            delete tributacao.ncmId;
        }


        const [result] = await Knex(ETableNames.tributacoes)
            .insert(tributacao)
            .returning('id');


        return result;

    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
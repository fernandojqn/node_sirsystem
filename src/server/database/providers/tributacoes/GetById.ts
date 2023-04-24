import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITributacao } from '../../models';


export const getById = async (id: number): Promise<ITributacao | Error> => {

    try {
        const result = await Knex(ETableNames.tributacoes)
            .select('*')
            .where('id', '=', id)
            .first(); // só quero o primeiro da lista, ele para de procurar no bd

        if(result) return result;


        return new Error('Registro não encontrado');
    } catch (error) {
        return new Error('Erro ao consultar o registro');
    }
};
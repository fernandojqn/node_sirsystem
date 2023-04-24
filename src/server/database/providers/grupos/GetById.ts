import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IGrupo } from '../../models';


export const getById = async (id: number): Promise<IGrupo | Error> => {

    try {
        const result = await Knex(ETableNames.grupos)
            .select('*')
            .where('id', '=', id)
            .first(); // só quero o primeiro da lista, ele para de procurar no bd

        if(result) return result;


        return new Error('Registro não encontrado');
    } catch (error) {
        return new Error('Erro ao consultar o registro');
    }
};
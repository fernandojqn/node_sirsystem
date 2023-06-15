import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IProduto } from '../../models';

export const getAll = async (page: number, limit: number, filter: string, id = 0, empresaId: number): Promise<IProduto[] | Error> => {

    try {
        const result = await Knex(ETableNames.produtos)
            .select('*') // seleciona tudo
            .where('produto', 'like', `%${filter}%`) // "ou" que o nome "seja igual" ao filtro
            .andWhere('empresaId', Number(empresaId))
            .orderBy('produto')
            .offset((page - 1) * limit) //formula para aparecer a quantidade por pagina
            .limit(limit); // limita quantos registros vai aparecer por paginação

        //se teve resultado  && every(diferente) se todos os ids forem diferente do resultado da busca {
        

        return result;
    } catch (error) {
        return new Error('Erro ao consultar os registros');
    }
};
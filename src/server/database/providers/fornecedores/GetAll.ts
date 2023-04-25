import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IFornecedor } from '../../models';


export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IFornecedor[] | Error> => {

    try {
        const result = await Knex(ETableNames.fornecedores)
            .select('*') // seleciona tudo
            .where('id', Number(id)) //que tenha esse id
            .orWhere('sufixo', 'like', `%${filter}%`) // "ou" que o nome "seja igual" ao filtro
            .offset((page - 1) * limit) //formula para aparecer a quantidade por pagina
            .limit(limit); // limita quantos registros vai aparecer por paginação

        //se teve resultado  && every(diferente) se todos os ids forem diferente do resultado da busca {
        if (id > 0 && result.every(item => item.id !== id)) { 
            const resultById = await Knex(ETableNames.fornecedores)
                .select('*')
                .where('id', '=', id)
                .first();

            if(resultById) return [...result, resultById]; //pega todo o resultado e adiciona o resultadobyid
        }

        return result;
    } catch (error) {
        return new Error('Erro ao consultar os registros');
    }
};
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IModelo } from '../../models';



export const getAll = async (page: number, limit: number, filter: string, filter2: string, empresaId: number): Promise<IModelo[] | Error> => {

    try {
        const result = await Knex(ETableNames.modelos)
            .select('*') // seleciona tudo
            //.where('id', Number(id)) //que tenha esse id
            .where('idDoTipo', 'like', `${filter}`) // "ou" que o nome "seja igual" ao filtro
            .andWhere('idDoSub', 'like', `${filter2}`)
            .andWhere('empresaId', Number(empresaId))
            .orderBy('modeloDescricao')
            .offset((page - 1) * limit) //formula para aparecer a quantidade por pagina
            .limit(limit); // limita quantos registros vai aparecer por paginação
        
        return result;
    } catch (error) {
        return new Error('Erro ao consultar os registros');
    }
};
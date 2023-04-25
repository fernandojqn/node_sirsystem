import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';



export const count = async (filter = ''): Promise<number | Error> => {

    try {
        //fiz uma lista array para colocar todos os registros
        const [{ count }] = await Knex(ETableNames.fornecedores)
            .where('sufixo', 'like', `%${filter}%`)
            .count<[{ count: number}]>('* as count');
            //tipo a count do SQL e coloco todos os resultados nela

        // Se o numero count for um inteiro valido
        if (Number.isInteger(Number(count))) return Number(count);

        return new Error('Erro ao consultar a quantidade total de registros');        
    } catch (error) {
        return new Error('Erro ao consultar a quantidade total de registros');
    }
};
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPedidosVendasProdutos } from '../../models';


export const printGetAll = async (filter: string, empresaId: number): Promise<IPedidosVendasProdutos[] | Error> => {

    try {        
        const result = await Knex(ETableNames.pedidosVendasProdutos)
            .select('id', 'pedidoId', 'empresaId', 'usuarioId', 'numeroItem', 'quantidade', 'produto', 'precoUnitario', 'subTotal')
            .where('pedidoId', 'like', `%${filter}%`) // "ou" que o nome "seja igual" ao filtro
            .andWhere('empresaId', Number(empresaId));  
            
        return result;
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }
};
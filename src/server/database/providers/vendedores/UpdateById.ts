import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IVendedor } from '../../models';


export const updateById = async (id: number, vendedor: Omit<IVendedor, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.vendedores)
            .update(vendedor)
            .where('id', '=', id);
            
        if(result) return;


        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
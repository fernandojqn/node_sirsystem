import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IModelo } from '../../models';


export const updateById = async (id: number, modelo: Omit<IModelo, 'id'>): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.modelos)
            .update(modelo)
            .where('id', '=', id);
            
        if(result) return;


        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
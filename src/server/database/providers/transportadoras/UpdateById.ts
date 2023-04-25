import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITransportadora } from '../../models';


export const updateById = async (id: number, transportadora: Omit<ITransportadora, 'id'>): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.transportadoras)
            .update(transportadora)
            .where('id', '=', id);
            
        if(result) return;


        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
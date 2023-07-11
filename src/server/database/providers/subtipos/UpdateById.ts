import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import {ISubTipo } from '../../models';

export const updateById = async (id: number, subTipo: Omit<ISubTipo, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

    try {
        const result = await Knex(ETableNames.subTipos)
            .update(subTipo)
            .where('id', '=', id);
            
        if(result) return;


        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
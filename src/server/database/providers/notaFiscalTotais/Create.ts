import { INotaFiscalTotais } from '../../models';
import { ETableNames } from '../../ETableNames';
import { format, parse } from 'date-fns';
import { Knex } from '../../knex';

export const create = async (totais: Omit<INotaFiscalTotais, 'id'>): Promise<object | Number | Error> => {

    try {
        if (totais.vendedorId === 0) { 
            delete totais.vendedorId; 
        }
        
        if (totais.transportadoraId === 0) { 
            delete totais.transportadoraId; 
        }

        let dataVencimentoFormatada;
        if (totais.dataVencimento) {
            const dataVencimento = parse(totais.dataVencimento, 'dd/MM/yyyy', new Date());
            dataVencimentoFormatada = format(dataVencimento, 'yyyy-MM-dd');
        }

        const [result] = await Knex(ETableNames.notaFiscalTotais)
            .insert({...totais,
                dataVencimento: dataVencimentoFormatada})
            .returning('id');
        
        return result;
        
    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};



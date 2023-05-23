import { INotaFiscalTotais } from '../../models';
import { ETableNames } from '../../ETableNames';
import { format, parse } from 'date-fns';
import { Knex } from '../../knex';



export const updateById = async (id: number, totais: Omit<INotaFiscalTotais, 'id' | 'empresaId' | 'usuarioId'>): Promise<void | Error> => {

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

        const result = await Knex(ETableNames.notaFiscalTotais)
            .update({...totais,
                dataVencimento: dataVencimentoFormatada})
            .where('id', '=', id);
            
        if(result) return;

        return new Error('Erro ao atualizar o registro');        
    } catch (error) {
        return new Error('Erro ao atualizar o registro');
    }
};
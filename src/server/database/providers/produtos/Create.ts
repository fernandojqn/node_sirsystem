import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IProduto } from '../../models';

export const create = async (produto: Omit<IProduto, 'id' | 'empresaId' | 'usuarioId'>): Promise<object | number | Error> => {

    try {
        if (produto.grupoId === 0) { delete produto.grupoId; }
        if (produto.tipoId === 0) { delete produto.tipoId; }
        if (produto.subId === 0) { delete produto.subId; }
        if (produto.modeloId === 0) { delete produto.modeloId; }
        if (produto.ncmId === 0) { delete produto.ncmId; }
        if (produto.fornecedor1Id === 0) { delete produto.fornecedor1Id; }
        if (produto.fornecedor2Id === 0) { delete produto.fornecedor2Id; }
        if (produto.fornecedor3Id === 0) { delete produto.fornecedor3Id; }

        const [result] = await Knex(ETableNames.produtos)
            .insert(produto)
            .returning('id');

        return result;

    } catch (error) {
        return new Error('Erro ao cadastrar o registro');
    }
};
import * as count from './Count';
import * as create from './Create';
import * as getAll from './GetAll';
import * as printGetAll from './PrintGetAll';
import * as getById from './GetById';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';

export const PedidosVendasProdutosProvider = {
    ...count,
    ...create,
    ...getAll,
    ...printGetAll,
    ...getById,
    ...updateById,
    ...deleteById
};
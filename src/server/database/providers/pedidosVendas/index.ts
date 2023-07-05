import * as count from './Count';
import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as PrintById from './PrintById';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';


export const PedidosVendasProvider = {
    ...count,
    ...create,
    ...getAll,
    ...getById,
    ...PrintById,
    ...updateById,
    ...deleteById
};
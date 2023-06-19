import * as create from './Create';
import * as getById from './GetById';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';

export const PedidosVendasMensagensProvider = {
    ...create,
    ...getById,
    ...updateById,
    ...deleteById
};
import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';

import * as printPedidosVendas from './print/printPedidosVendas';


export const PedidosVendasController = {
    ...create,
    ...getAll,
    ...getById,
    ...updateById,
    ...deleteById,

    ...printPedidosVendas
};


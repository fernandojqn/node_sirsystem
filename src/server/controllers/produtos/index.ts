import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';

import * as somaCapagem from './contas/SomaCapagem';
import * as subtracaoCapagem from './contas/subtracaoCapagem';

import * as precoVenda1 from './contas/PrecoVenda1';
import * as precoVenda2 from './contas/PrecoVenda2';
import * as precoVenda3 from './contas/PrecoVenda3';
import * as precoVenda4 from './contas/PrecoVenda4';
import * as precoVenda5 from './contas/PrecoVenda5';

import * as margemLucro1 from './contas/MargemLucro1';
import * as margemLucro2 from './contas/MargemLucro2';
import * as margemLucro3 from './contas/MargemLucro3';
import * as margemLucro4 from './contas/MargemLucro4';
import * as margemLucro5 from './contas/MargemLucro5';

export const ProdutosController = {
    ...create, ...getAll, ...getById, ...updateById, ...deleteById,

    ...somaCapagem, ...subtracaoCapagem,

    ...precoVenda1, ...precoVenda2, ...precoVenda3, ...precoVenda4,
    ...precoVenda5,

    ...margemLucro1, ...margemLucro2, ...margemLucro3, ...margemLucro4,
    ...margemLucro5
};
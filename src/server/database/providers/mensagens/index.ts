import * as count from './Count';
import * as create from './Create';
import * as getAll from './GetAll';
import * as getAllById from './GetAllById';
import * as getById from './GetById';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';

export const MensagensProvider = {
    ...count,
    ...create,
    ...getAll,
    ...getAllById,
    ...getById,
    ...updateById,
    ...deleteById
};
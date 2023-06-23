import * as create from './Create';
import * as getAll from './GetAll';
import * as getAllById from './GetAllById';
import * as getById from './GetById';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';

export const MensagensController = {
    ...create,
    ...getAll,
    ...getAllById,
    ...getById,
    ...updateById,
    ...deleteById
};


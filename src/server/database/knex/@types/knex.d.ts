import { IAtividade, IVendedor, INcm } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
      atividades: IAtividade,
      vendedores: IVendedor,
      ncm: INcm,
    }
  }
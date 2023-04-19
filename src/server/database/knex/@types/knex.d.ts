import { IAtividade, IVendedor} from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
      atividades: IAtividade
      vendedores: IVendedor      
    }
  }
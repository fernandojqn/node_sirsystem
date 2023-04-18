import { IAtividade} from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
      atividades: IAtividade
      // clientes: ICliente
      // empresas: IEmpresa
    }
  }
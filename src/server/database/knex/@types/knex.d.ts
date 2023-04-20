import { IAtividade, IVendedor, INcm, ICliente, IEmpresa, IFornecedor, IGrupo, IModelo, 
    IProduto, ISubTipo, ITipo, ITransportadora, ITributacao, IUsuario } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        atividades: IAtividade,
        clientes: ICliente,
        empresas: IEmpresa,
        fornecedores: IFornecedor,
        grupos: IGrupo,
        modelos: IModelo,
        ncm: INcm,
        produtos: IProduto,
        subTipos: ISubTipo,
        tipos: ITipo,
        transportadoras: ITransportadora,
        tributacoes: ITributacao,
        usuarios: IUsuario,
        vendedores: IVendedor,
    }
  }
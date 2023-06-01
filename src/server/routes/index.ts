import { ensureAuthenticated } from '../shared/middlewares';
import { Router } from 'express';
import { AtividadesController, ClientesController, EmpresasController, FornecedoresController, GruposController, LoginController, 
    ModelosController, NcmController, PedidosVendasController, PedidosVendasProdutosController, PedidosVendasTotaisController, ProdutosController, SubTiposController, TiposController, 
    TransportadorasController, TributacoesController, UsuariosController, VendedoresController } from './../controllers';

const router = Router();

// Rota teste
router.get('/', (_, res) => { return res.send('Olá, DEV!'); });

// Rotas da paginas de Login
router.post('/entrar', LoginController.singInValidation, LoginController.singIn);

///////////////////////Rotas para salvar no banco de dados///////////////////////
// Rotas da paginas atividades
router.post('/atividades', ensureAuthenticated, AtividadesController.createValidation, AtividadesController.create);
router.get('/atividades', ensureAuthenticated, AtividadesController.getAllValidation, AtividadesController.getAll);
router.get('/atividades/:id', ensureAuthenticated, AtividadesController.getByIdValidation, AtividadesController.getById);
router.put('/atividades/:id', ensureAuthenticated, AtividadesController.updateByIdValidation, AtividadesController.updateById);
router.delete('/atividades/:id', ensureAuthenticated, AtividadesController.deleteByIdValidation, AtividadesController.deleteById);

// Rotas da paginas clientes
router.post('/clientes', ensureAuthenticated, ClientesController.createValidation, ClientesController.create);
router.get('/clientes', ensureAuthenticated, ClientesController.getAllValidation, ClientesController.getAll);
router.get('/clientes/:id', ensureAuthenticated, ClientesController.getByIdValidation, ClientesController.getById);
router.put('/clientes/:id', ensureAuthenticated, ClientesController.updateByIdValidation, ClientesController.updateById);
router.delete('/clientes/:id', ensureAuthenticated, ClientesController.deleteByIdValidation, ClientesController.deleteById);

// Rotas da paginas empresas
router.post('/empresas', EmpresasController.createValidation, EmpresasController.create); 
router.get('/empresas', ensureAuthenticated, EmpresasController.getAllValidation, EmpresasController.getAll);
router.get('/empresas/:id', ensureAuthenticated, EmpresasController.getByIdValidation, EmpresasController.getById);
router.put('/empresas/:id', ensureAuthenticated, EmpresasController.updateByIdValidation, EmpresasController.updateById);
router.delete('/empresas/:id', ensureAuthenticated, EmpresasController.deleteByIdValidation, EmpresasController.deleteById);

// Rotas da paginas fornecedores
router.post('/fornecedores', ensureAuthenticated, FornecedoresController.createValidation, FornecedoresController.create);
router.get('/fornecedores', ensureAuthenticated, FornecedoresController.getAllValidation, FornecedoresController.getAll);
router.get('/fornecedores/:id', ensureAuthenticated, FornecedoresController.getByIdValidation, FornecedoresController.getById);
router.put('/fornecedores/:id', ensureAuthenticated, FornecedoresController.updateByIdValidation, FornecedoresController.updateById);
router.delete('/fornecedores/:id', ensureAuthenticated, FornecedoresController.deleteByIdValidation, FornecedoresController.deleteById);

// Rotas da paginas Grupos
router.post('/grupos', ensureAuthenticated, GruposController.createValidation, GruposController.create);
router.get('/grupos', ensureAuthenticated, GruposController.getAllValidation, GruposController.getAll);
router.get('/grupos/:id', ensureAuthenticated, GruposController.getByIdValidation, GruposController.getById);
router.put('/grupos/:id', ensureAuthenticated, GruposController.updateByIdValidation, GruposController.updateById);
router.delete('/grupos/:id', ensureAuthenticated, GruposController.deleteByIdValidation, GruposController.deleteById);

// Rotas da paginas Modelos
router.post('/modelos', ensureAuthenticated, ModelosController.createValidation, ModelosController.create);
router.get('/modelos', ensureAuthenticated, ModelosController.getAllValidation, ModelosController.getAll);
router.get('/modelos/:id', ensureAuthenticated, ModelosController.getByIdValidation, ModelosController.getById);
router.put('/modelos/:id', ensureAuthenticated, ModelosController.updateByIdValidation, ModelosController.updateById);
router.delete('/modelos/:id', ensureAuthenticated, ModelosController.deleteByIdValidation, ModelosController.deleteById);

// Rotas da paginas NCM
router.post('/ncm', ensureAuthenticated, NcmController.createValidation, NcmController.create);
router.get('/ncm', ensureAuthenticated, NcmController.getAllValidation, NcmController.getAll);
router.get('/ncm/:id', ensureAuthenticated, NcmController.getByIdValidation, NcmController.getById);
router.put('/ncm/:id', ensureAuthenticated, NcmController.updateByIdValidation, NcmController.updateById);
router.delete('/ncm/:id', ensureAuthenticated, NcmController.deleteByIdValidation, NcmController.deleteById);

// Rotas da paginas Pedidos Vendas
router.post('/pedidosvendas', ensureAuthenticated, PedidosVendasController.createValidation, PedidosVendasController.create);
router.get('/pedidosvendas', ensureAuthenticated, PedidosVendasController.getAllValidation, PedidosVendasController.getAll);
router.get('/pedidosvendas/:id', ensureAuthenticated, PedidosVendasController.getByIdValidation, PedidosVendasController.getById);
router.put('/pedidosvendas/:id', ensureAuthenticated, PedidosVendasController.updateByIdValidation, PedidosVendasController.updateById);
router.delete('/pedidosvendas/:id', ensureAuthenticated, PedidosVendasController.deleteByIdValidation, PedidosVendasController.deleteById);

// Rotas da paginas Pedidos Vendas Produtos
router.post('/pedidosvendasprodutos', ensureAuthenticated, PedidosVendasProdutosController.createValidation, PedidosVendasProdutosController.create);
router.get('/pedidosvendasprodutos', ensureAuthenticated, PedidosVendasProdutosController.getAllValidation, PedidosVendasProdutosController.getAll);
router.get('/pedidosvendasprodutos/:id', ensureAuthenticated, PedidosVendasProdutosController.getByIdValidation, PedidosVendasProdutosController.getById);
router.put('/pedidosvendasprodutos/:id', ensureAuthenticated, PedidosVendasProdutosController.updateByIdValidation, PedidosVendasProdutosController.updateById);
router.delete('/pedidosvendasprodutos/:id', ensureAuthenticated, PedidosVendasProdutosController.deleteByIdValidation, PedidosVendasProdutosController.deleteById);

// Rotas da paginas Pedidos Vendas Totais
router.post('/pedidosvendastotais', ensureAuthenticated, PedidosVendasTotaisController.createValidation, PedidosVendasTotaisController.create);
router.get('/pedidosvendastotais', ensureAuthenticated, PedidosVendasTotaisController.getAllValidation, PedidosVendasTotaisController.getAll);
router.get('/pedidosvendastotais/:id', ensureAuthenticated, PedidosVendasTotaisController.getByIdValidation, PedidosVendasTotaisController.getById);
router.put('/pedidosvendastotais/:id', ensureAuthenticated, PedidosVendasTotaisController.updateByIdValidation, PedidosVendasTotaisController.updateById);
router.delete('/pedidosvendastotais/:id', ensureAuthenticated, PedidosVendasTotaisController.deleteByIdValidation, PedidosVendasTotaisController.deleteById);

// Rotas da paginas Produtos
router.post('/produtos', ensureAuthenticated, ProdutosController.createValidation, ProdutosController.create);
router.get('/produtos', ensureAuthenticated, ProdutosController.getAllValidation, ProdutosController.getAll);
router.get('/produtos/:id', ensureAuthenticated, ProdutosController.getByIdValidation, ProdutosController.getById);
router.put('/produtos/:id', ensureAuthenticated, ProdutosController.updateByIdValidation, ProdutosController.updateById);
router.delete('/produtos/:id', ensureAuthenticated, ProdutosController.deleteByIdValidation, ProdutosController.deleteById);

// Rotas da paginas SubTipo
router.post('/subtipos', ensureAuthenticated, SubTiposController.createValidation, SubTiposController.create);
router.get('/subtipos', ensureAuthenticated, SubTiposController.getAllValidation, SubTiposController.getAll);
router.get('/subtipos/:id', ensureAuthenticated, SubTiposController.getByIdValidation, SubTiposController.getById);
router.put('/subtipos/:id', ensureAuthenticated, SubTiposController.updateByIdValidation, SubTiposController.updateById);
router.delete('/subtipos/:id', ensureAuthenticated, SubTiposController.deleteByIdValidation, SubTiposController.deleteById);

// Rotas da paginas Tipos
router.post('/tipos', ensureAuthenticated, TiposController.createValidation, TiposController.create);
router.get('/tipos', ensureAuthenticated, TiposController.getAllValidation, TiposController.getAll);
router.get('/tipos/:id', ensureAuthenticated, TiposController.getByIdValidation, TiposController.getById);
router.put('/tipos/:id', ensureAuthenticated, TiposController.updateByIdValidation, TiposController.updateById);
router.delete('/tipos/:id', ensureAuthenticated, TiposController.deleteByIdValidation, TiposController.deleteById);

// Rotas da paginas Transportadoras
router.post('/transportadoras', ensureAuthenticated, TransportadorasController.createValidation, TransportadorasController.create);
router.get('/transportadoras', ensureAuthenticated, TransportadorasController.getAllValidation, TransportadorasController.getAll);
router.get('/transportadoras/:id', ensureAuthenticated, TransportadorasController.getByIdValidation, TransportadorasController.getById);
router.put('/transportadoras/:id', ensureAuthenticated, TransportadorasController.updateByIdValidation, TransportadorasController.updateById);
router.delete('/transportadoras/:id', ensureAuthenticated, TransportadorasController.deleteByIdValidation, TransportadorasController.deleteById);

// Rotas da paginas Tributacoes
router.post('/tributacoes', ensureAuthenticated, TributacoesController.createValidation, TributacoesController.create);
router.get('/tributacoes', ensureAuthenticated, TributacoesController.getAllValidation, TributacoesController.getAll);
router.get('/tributacoes/:id', ensureAuthenticated, TributacoesController.getByIdValidation, TributacoesController.getById);
router.put('/tributacoes/:id', ensureAuthenticated, TributacoesController.updateByIdValidation, TributacoesController.updateById);
router.delete('/tributacoes/:id', ensureAuthenticated, TributacoesController.deleteByIdValidation, TributacoesController.deleteById);

// Rotas da paginas Usuarios
router.post('/usuarios', UsuariosController.createValidation, UsuariosController.create);
router.get('/usuarios', UsuariosController.getAllValidation, UsuariosController.getAll);
router.get('/usuarios/:id', UsuariosController.getByIdValidation, UsuariosController.getById);
router.put('/usuarios/:id', ensureAuthenticated, UsuariosController.updateByIdValidation, UsuariosController.updateById);
router.delete('/usuarios/:id', ensureAuthenticated, UsuariosController.deleteByIdValidation, UsuariosController.deleteById);

// Rotas da paginas vendedores
router.post('/vendedores', ensureAuthenticated, VendedoresController.createValidation, VendedoresController.create);
router.get('/vendedores', ensureAuthenticated, VendedoresController.getAllValidation, VendedoresController.getAll);
router.get('/vendedores/:id', ensureAuthenticated, VendedoresController.getByIdValidation, VendedoresController.getById);
router.put('/vendedores/:id', ensureAuthenticated, VendedoresController.updateByIdValidation, VendedoresController.updateById);
router.delete('/vendedores/:id', ensureAuthenticated, VendedoresController.deleteByIdValidation, VendedoresController.deleteById);


///////////////////////Rotas para contas nas paginas///////////////////////
//Rotas da pagina produto
router.post('/produtos/somaCapagem', ProdutosController.somaCapagem);
router.post('/produtos/subtracaoCapagem', ProdutosController.subtracaoCapagem);
router.post('/produtos/precoVenda1', ProdutosController.precoVenda1);
router.post('/produtos/precoVenda2', ProdutosController.precoVenda2);
router.post('/produtos/precoVenda3', ProdutosController.precoVenda3);
router.post('/produtos/precoVenda4', ProdutosController.precoVenda4);
router.post('/produtos/precoVenda5', ProdutosController.precoVenda5);
router.post('/produtos/margemLucro1', ProdutosController.margemLucro1);
router.post('/produtos/margemLucro2', ProdutosController.margemLucro2);
router.post('/produtos/margemLucro3', ProdutosController.margemLucro3);
router.post('/produtos/margemLucro4', ProdutosController.margemLucro4);
router.post('/produtos/margemLucro5', ProdutosController.margemLucro5);

//Exporta os caminhos para o Server.ts
export { router };
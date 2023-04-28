import { Router } from 'express';
import { AtividadesController, ClientesController, EmpresasController, FornecedoresController, GruposController, LoginController, ModelosController, NcmController, ProdutosController, SubTiposController, TiposController, TransportadorasController, TributacoesController, UsuariosController, VendedoresController } from './../controllers';
import { ensureAuthenticated } from '../shared/middlewares';

const router = Router();

// Rota teste
router.get('/', (_, res) => { return res.send('Olá, DEV!'); });

// Rotas da paginas de Login
router.post('/entrar', LoginController.singInValidation, LoginController.singIn);

// Rotas da paginas atividades
router.post('/atividades', AtividadesController.createValidation, AtividadesController.create); // ensureAuthenticated,
router.get('/atividades', AtividadesController.getAllValidation, AtividadesController.getAll);
router.get('/atividades/:id', AtividadesController.getByIdValidation, AtividadesController.getById);
router.put('/atividades/:id', AtividadesController.updateByIdValidation, AtividadesController.updateById);
router.delete('/atividades/:id', AtividadesController.deleteByIdValidation, AtividadesController.deleteById);

// Rotas da paginas clientes
router.post('/clientes', ClientesController.createValidation, ClientesController.create);
router.get('/clientes', ClientesController.getAllValidation, ClientesController.getAll);
router.get('/clientes/:id', ClientesController.getByIdValidation, ClientesController.getById);
router.put('/clientes/:id', ClientesController.updateByIdValidation, ClientesController.updateById);
router.delete('/clientes/:id', ClientesController.deleteByIdValidation, ClientesController.deleteById);

// Rotas da paginas empresas
router.post('/empresas', EmpresasController.createValidation, EmpresasController.create); 
router.get('/empresas', EmpresasController.getAllValidation, EmpresasController.getAll);
router.get('/empresas/:id', EmpresasController.getByIdValidation, EmpresasController.getById);
router.put('/empresas/:id', EmpresasController.updateByIdValidation, EmpresasController.updateById);
router.delete('/empresas/:id', EmpresasController.deleteByIdValidation, EmpresasController.deleteById);

// Rotas da paginas fornecedores
router.post('/fornecedores', FornecedoresController.createValidation, FornecedoresController.create);
router.get('/fornecedores', FornecedoresController.getAllValidation, FornecedoresController.getAll);
router.get('/fornecedores/:id', FornecedoresController.getByIdValidation, FornecedoresController.getById);
router.put('/fornecedores/:id', FornecedoresController.updateByIdValidation, FornecedoresController.updateById);
router.delete('/fornecedores/:id', FornecedoresController.deleteByIdValidation, FornecedoresController.deleteById);

// Rotas da paginas Grupos
router.post('/grupos', GruposController.createValidation, GruposController.create);
router.get('/grupos', GruposController.getAllValidation, GruposController.getAll);
router.get('/grupos/:id', GruposController.getByIdValidation, GruposController.getById);
router.put('/grupos/:id', GruposController.updateByIdValidation, GruposController.updateById);
router.delete('/grupos/:id', GruposController.deleteByIdValidation, GruposController.deleteById);

// Rotas da paginas Modelos
router.post('/modelos', ModelosController.createValidation, ModelosController.create);
router.get('/modelos', ModelosController.getAllValidation, ModelosController.getAll);
router.get('/modelos/:id', ModelosController.getByIdValidation, ModelosController.getById);
router.put('/modelos/:id', ModelosController.updateByIdValidation, ModelosController.updateById);
router.delete('/modelos/:id', ModelosController.deleteByIdValidation, ModelosController.deleteById);

// Rotas da paginas NCM
router.post('/ncm', NcmController.createValidation, NcmController.create);
router.get('/ncm', NcmController.getAllValidation, NcmController.getAll);
router.get('/ncm/:id', NcmController.getByIdValidation, NcmController.getById);
router.put('/ncm/:id', NcmController.updateByIdValidation, NcmController.updateById);
router.delete('/ncm/:id', NcmController.deleteByIdValidation, NcmController.deleteById);

// Rotas da paginas Produtos
router.post('/produtos', ProdutosController.createValidation, ProdutosController.create);
router.get('/produtos', ProdutosController.getAllValidation, ProdutosController.getAll);
router.get('/produtos/:id', ProdutosController.getByIdValidation, ProdutosController.getById);
router.put('/produtos/:id', ProdutosController.updateByIdValidation, ProdutosController.updateById);
router.delete('/produtos/:id', ProdutosController.deleteByIdValidation, ProdutosController.deleteById);

// Rotas da paginas SubTipo
router.post('/subtipos', SubTiposController.createValidation, SubTiposController.create);
router.get('/subtipos', SubTiposController.getAllValidation, SubTiposController.getAll);
router.get('/subtipos/:id', SubTiposController.getByIdValidation, SubTiposController.getById);
router.put('/subtipos/:id', SubTiposController.updateByIdValidation, SubTiposController.updateById);
router.delete('/subtipos/:id', SubTiposController.deleteByIdValidation, SubTiposController.deleteById);

// Rotas da paginas Tipos
router.post('/tipos', TiposController.createValidation, TiposController.create);
router.get('/tipos', TiposController.getAllValidation, TiposController.getAll);
router.get('/tipos/:id', TiposController.getByIdValidation, TiposController.getById);
router.put('/tipos/:id', TiposController.updateByIdValidation, TiposController.updateById);
router.delete('/tipos/:id', TiposController.deleteByIdValidation, TiposController.deleteById);

// Rotas da paginas Transportadoras
router.post('/transportadoras', TransportadorasController.createValidation, TransportadorasController.create);
router.get('/transportadoras', TransportadorasController.getAllValidation, TransportadorasController.getAll);
router.get('/transportadoras/:id', TransportadorasController.getByIdValidation, TransportadorasController.getById);
router.put('/transportadoras/:id', TransportadorasController.updateByIdValidation, TransportadorasController.updateById);
router.delete('/transportadoras/:id', TransportadorasController.deleteByIdValidation, TransportadorasController.deleteById);

// Rotas da paginas Tributacoes
router.post('/tributacoes', TributacoesController.createValidation, TributacoesController.create);
router.get('/tributacoes', TributacoesController.getAllValidation, TributacoesController.getAll);
router.get('/tributacoes/:id', TributacoesController.getByIdValidation, TributacoesController.getById);
router.put('/tributacoes/:id', TributacoesController.updateByIdValidation, TributacoesController.updateById);
router.delete('/tributacoes/:id', TributacoesController.deleteByIdValidation, TributacoesController.deleteById);

// Rotas da paginas Usuarios
router.post('/usuarios', UsuariosController.createValidation, UsuariosController.create);
router.get('/usuarios', UsuariosController.getAllValidation, UsuariosController.getAll);
router.get('/usuarios/:id', UsuariosController.getByIdValidation, UsuariosController.getById);
router.put('/usuarios/:id', UsuariosController.updateByIdValidation, UsuariosController.updateById);
router.delete('/usuarios/:id', UsuariosController.deleteByIdValidation, UsuariosController.deleteById);

// Rotas da paginas vendedores
router.post('/vendedores', VendedoresController.createValidation, VendedoresController.create);
router.get('/vendedores', VendedoresController.getAllValidation, VendedoresController.getAll);
router.get('/vendedores/:id', VendedoresController.getByIdValidation, VendedoresController.getById);
router.put('/vendedores/:id', VendedoresController.updateByIdValidation, VendedoresController.updateById);
router.delete('/vendedores/:id', VendedoresController.deleteByIdValidation, VendedoresController.deleteById);


//Exporta os caminhos para o Server.ts
export { router };
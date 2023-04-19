import { Router } from 'express';
import { AtividadesController, VendedoresController } from './../controllers';

const router = Router();

// Rota teste
router.get('/', (_, res) => { return res.send('Olá, DEV!'); });

// Rotas da pagina atividades
router.post('/atividades', AtividadesController.createValidation, AtividadesController.create);
router.get('/atividades', AtividadesController.getAllValidation, AtividadesController.getAll);
router.get('/atividades/:id', AtividadesController.getByIdValidation, AtividadesController.getById);
router.put('/atividades/:id', AtividadesController.updateByIdValidation, AtividadesController.updateById);
router.delete('/atividades/:id', AtividadesController.deleteByIdValidation, AtividadesController.deleteById);

// Rotas da pagina vendedores
router.post('/vendedores', VendedoresController.createValidation, VendedoresController.create);
router.get('/vendedores', VendedoresController.getAllValidation, VendedoresController.getAll);
router.get('/vendedores/:id', VendedoresController.getByIdValidation, VendedoresController.getById);
router.put('/vendedores/:id', VendedoresController.updateByIdValidation, VendedoresController.updateById);
router.delete('/vendedores/:id', VendedoresController.deleteByIdValidation, VendedoresController.deleteById);



//Exporta os caminhos para o Server.ts
export { router };
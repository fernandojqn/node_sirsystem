import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AtividadesController } from './../controllers';

const router = Router();

// Rota teste
router.get('/', (_, res) => { return res.send('Olá, DEV!'); });

// Rotas da pagina atividades
router.post('/atividades', AtividadesController.createValidation, AtividadesController.create);
router.get('/atividades', AtividadesController.getAllValidation, AtividadesController.getAll);
router.get('/atividades/:id', AtividadesController.getByIdValidation, AtividadesController.getById);
router.put('/atividades/:id', AtividadesController.updateByIdValidation, AtividadesController.updateById);
router.delete('/atividades/:id', AtividadesController.deleteByIdValidation, AtividadesController.deleteById);


//Exporta os caminhos para o Server.ts
export { router };
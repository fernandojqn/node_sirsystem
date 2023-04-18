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
export { router };
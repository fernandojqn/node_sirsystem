import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Atividades - UpdateById', () => {

    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/atividades')
            .send({ atividade: 'comercio' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/atividades/${res1.body}`)
            .send({ atividade: 'vendas' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/atividades/99999')
            .send({ atividade: 'venda' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});
import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Vendedores - UpdateById', () => {

    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/vendedores')
            .send({ nome: 'Roberto' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/vendedores/${res1.body}`)
            .send({ nome: 'Alexandre' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/vendedores/99999')
            .send({ nome: 'Roberto' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});
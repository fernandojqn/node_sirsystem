import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Grupos - UpdateById', () => {

    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/grupos')
            .send({ grupoDescricao: 'automoveis' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/grupos/${res1.body}`)
            .send({ grupoDescricao: 'ameba' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/grupos/99999')
            .send({ grupoDescricao: 'venda' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});
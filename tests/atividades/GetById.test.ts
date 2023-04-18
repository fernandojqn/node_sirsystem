import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Atividades - GetById', () => {

    it('Busca registro por id', async () => {

        const res1 = await testServer
            .post('/atividades')
            .send({ atividade: 'comercio' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get(`/atividades/${res1.body}`)
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('atividade');
    });
    it('Tenta buscar registro que não existe', async () => {

        const res1 = await testServer
            .get('/atividades/999999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});




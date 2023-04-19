import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Atividades - GetAll', () => {

    it('Buscar todos os registros', async () => {
        //criar registro
        const res1 = await testServer
            .post('/atividades')
            .send({ atividade: 'loja' });

        //expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get('/atividades')
            .send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});





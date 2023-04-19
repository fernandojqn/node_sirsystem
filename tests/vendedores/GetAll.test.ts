import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Vendedores - GetAll', () => {

    it('Buscar todos os registros', async () => {
        //crear registro
        const res1 = await testServer
            .post('/vendedores')
            .send({ nome: 'Busca' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        //buscar todos os registros
        const resBuscada = await testServer
            .get('/vendedores')
            .send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});

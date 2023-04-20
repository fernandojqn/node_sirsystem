import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('NCM - GetAll', () => {

    it('Buscar todos os registros', async () => {
        //crear registro
        const res1 = await testServer
            .post('/ncm')
            .send({ ncmNumero: '22222222', descricao: 'carne', cestNumero: '1234567'});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        //buscar todos os registros
        const resBuscada = await testServer
            .get('/ncm')
            .send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});

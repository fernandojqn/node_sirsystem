import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('NCM - GetById', () => {

    it('Busca registro por id', async () => {

        const res1 = await testServer
            .post('/ncm')
            .send({ ncmNumero: '33333333', descricao: 'carne', cestNumero: '1234567' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get(`/ncm/${res1.body}`)
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('ncmNumero');
    });
    it('Tenta buscar registro que não existe', async () => {

        const res1 = await testServer
            .get('/ncm/999999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});




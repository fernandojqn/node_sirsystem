import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('NCM - UpdateById', () => {

    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/ncm')
            .send({ ncmNumero: '12345678', descricao: 'carne', cestNumero: '1234567' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/ncm/${res1.body}`)
            .send({ ncmNumero: '44444444', descricao: 'carne', cestNumero: '1234567' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta atualizar registro com o mesmo ncmNumero', async () => {

        const res1 = await testServer
            .put('/ncm/99999')
            .send({ ncmNumero: '12345678', descricao: 'carne', cestNumero: '1234567' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });


    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/ncm/99999')
            .send({ ncmNumero: '55555555', descricao: 'carne', cestNumero: '1234567' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});
import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('NCM - Create', () => {

    it('Cria Registro', async () => {
        const res1 = await testServer.post('/ncm').send({ atividade: 'vendas'});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    
    it('txtAtividade curto', async () => {
        const res1 = await testServer.post('/atividades').send({ atividade: 've'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.atividade');
    });

    it('txtAtividade vazio pois é requerido', async () => {
        const res1 = await testServer.post('/atividades').send({ });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.atividade');
    });
});





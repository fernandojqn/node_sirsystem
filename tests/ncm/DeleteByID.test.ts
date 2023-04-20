import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('NCM - DeleteById', () => {

    it('deleta registro', async () => {
        //criar um registro
        const res1 = await testServer.post('/ncm').send({ncmNumero: '12345679', descricao: 'carne', cestNumero: '1234567'});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        
        //deletar registro
        const resApagar = await testServer.delete(`/ncm/${res1.body}`).send();

        expect(resApagar.statusCode).toEqual(StatusCodes.NO_CONTENT);        
    });
    
    it('Tenta apagar um registro que não existe', async () => {
        const res1 = await testServer.delete('/ncm/999999').send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });    
});





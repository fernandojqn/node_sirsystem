import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Grupo - DeleteById', () => {

    it('deleta registro', async () => {
        //criar um registro
        const res1 = await testServer.post('/grupos').send({grupoDescricao: 'venda'});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        
        //deletar registro
        const resApagar = await testServer.delete(`/grupos/${res1.body}`).send();

        expect(resApagar.statusCode).toEqual(StatusCodes.NO_CONTENT);        
    });
    
    it('Tenta apagar um registro que não existe', async () => {
        const res1 = await testServer.delete('/grupos/999999').send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });    
});





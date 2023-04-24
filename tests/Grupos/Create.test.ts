import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Grupo - Create', () => {

    it('Cria Registro', async () => {
        // Cria um NCM para test
        const ncm = await testServer.post('/ncm').send ({ncmNumero: '12121212', descricao: 'bisteca', cestNumero: '1234567'});

        const res1 = await testServer.post('/grupos').send({ grupoDescricao: 'batata', produtoAcabado: 'true', materiaPrima: 'true', ncmNumero: ncm, comissao: '2.2'});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    
    it('GrupoDescricao curto', async () => {
        const res1 = await testServer.post('/grupos').send({ atividade: 'ba'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.grupoDescricao');
    });

    it('GrupoDescricao vazio pois é requerido', async () => {
        const res1 = await testServer.post('/grupos').send({ produtoAcabado: 'true', materiaPrima: 'true', ncmNumero: 1, comissao: '2.2' });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.grupoDescricao');
    });
});





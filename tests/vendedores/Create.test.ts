import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Vendedores - Create', () => {

    it('Cria Registro Certo', async () => {
        const res1 = await testServer.post('/vendedores').send({ nome: 'Manuel', tipoEmpresa: 'fisica', documento: '311950398', inscricao: '25994672', telefone: '11958242494', celular: '11958242494',
            email: 'fernandojqnunes@gmail.com', endereco: 'rua ismael neri', numero: '153', complemento: 'casa 1', bairro: 'agua fria', cidade: 'São Paulo', uf: 'SP', cep: '02023070', pais: 'Brasil', 
            municipio: '12345678', comissao: 1.5, irpf: 2.3, banco: 'BB', agencia: '02582', conta: '3565', pix: '11958242494', obs: 'cansei de digitar' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    
    
    it('txtNome curto', async () => {
        const res1 = await testServer.post('/vendedores').send({ nome: 'Ma'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });

    
    it('txtNome longo', async () => {
        const res1 = await testServer.post('/vendedores').send({ nome: '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });

    
    it('txtNome vazio pois é requerido', async () => {
        const res1 = await testServer.post('/vendedores').send({ });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });

    
    it('Cria com email errado', async () => {
        const res1 = await testServer.post('/vendedores').send({nome: 'Manuel', email: 'fernandojqnunesgmail.com'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    
    
});





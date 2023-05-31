
import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('NCM - Create', () => {

    it('Cria Registro', async () => {
        const res1 = await testServer.post('/ncm').send({ ncmNumero: '12345678', descricao: 'carne', cestNumero: '1234567'});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Cria Registro duplicado', async () => {
        const res1 = await testServer.post('/ncm').send({ ncmNumero: '12345678', descricao: 'peixe', cestNumero: '7654321'});

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        //expect(res1.body).toHaveProperty('errors.body');
    });

    it('NCM numero faltando', async () => {
        const res1 = await testServer.post('/ncm').send({ descricao: 'carne', cestNumero: '1234567'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.ncmNumero');
    });
    
    it('NCM numero curto', async () => {
        const res1 = await testServer.post('/ncm').send({ ncmNumero: '1234567', descricao: 'carne', cestNumero: '1234567'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.ncmNumero');
    });

    it('NCM numero longo', async () => {
        const res1 = await testServer.post('/ncm').send({ ncmNumero: '123456789', descricao: 'carne', cestNumero: '1234567'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.ncmNumero');
    });

    //
    it('CEST numero sem o campo', async () => {
        const res1 = await testServer.post('/ncm').send({ ncmNumero: '1234567', descricao: 'carne', });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cestNumero');
    });

    it('CEST numero curto', async () => {
        const res1 = await testServer.post('/ncm').send({ ncmNumero: '1234567', descricao: 'carne', cestNumero: '123456'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cestNumero');
    });

    it('CEST numero longo', async () => {
        const res1 = await testServer.post('/ncm').send({ ncmNumero: '123456789', descricao: 'carne', cestNumero: '12345678'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cestNumero');
    });


    //
    it('Descrição sem o campo', async () => {
        const res1 = await testServer.post('/ncm').send({ ncmNumero: '1234567', cestNumero: '123456' });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.descricao');
    });

    it('Descrição curto', async () => {
        const res1 = await testServer.post('/ncm').send({ ncmNumero: '1234567', descricao: 'ca', cestNumero: '123456'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.descricao');
    });

    it('Descrição longo', async () => {
        const res1 = await testServer.post('/ncm').send({ ncmNumero: '123456789', descricao: '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901', cestNumero: '12345678'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.descricao');
    });


});





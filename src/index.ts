import { server } from './server/Server';

// recebe a constante sever com os adicionais e deixa escutando pela porta 3333
server.listen(process.env.PORT || 3333, () => console.log('App rodando!'));
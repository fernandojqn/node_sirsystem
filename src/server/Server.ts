import express from 'express';
import { router } from './routes';
import 'dotenv/config';

const server = express(); //fazendo uma constante da biblioteca express

server.use(express.json()); //avisar que o tipo de dados que está vindo pelo o corpo é json

server.use( router ); // puxar as rotas do routes/index.ts

export { server }; //enviando a constante
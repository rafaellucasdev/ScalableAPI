import 'reflect-metadata';
import express from 'express';

import './database/connect';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3001, () => console.log('Servidor rodando em http://localhost:3001'));
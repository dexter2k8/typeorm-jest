import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import handleError from './errors/handleError';
import loginRoutes from './routes/login.routes';
import userRoutes from './routes/users.routes';
import techRoutes from './routes/techs.routes';
import projectRoutes from './routes/projects.routes';

const app = express();
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/technologies', techRoutes);
app.use('/projects', projectRoutes);

//Middleware para tratamento global de erro. Evita "crashar" o servidor em erros de requisição.
app.use(handleError);

export default app;

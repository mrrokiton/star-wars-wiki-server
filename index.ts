import express from 'express';
import { addPeopleRoutes } from './src/routes/people-routes';

const app = express();

app.use(express.json());

addPeopleRoutes(app);

app.listen(3000, () => console.log('API server is running...'));

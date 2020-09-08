import 'dotenv/config';
import express from 'express';
import routes from './routes';

import MongoDB from './middlewares/MongoDB';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => response.json({ message: 'Hello World' }));

app.listen(process.env.SERVER_PORT, async () => {
  console.log(`\n\n 🟢 Server running on port ${process.env.SERVER_PORT} \n`);
  await MongoDB();
});

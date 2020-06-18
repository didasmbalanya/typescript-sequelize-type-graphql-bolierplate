/* eslint-disable no-console */
import 'reflect-metadata';
import { startServer } from './app';
import env from './config/environment.js';
import { syncDb } from './utils/storage/syncDb';

const PORT = env.NODE_ENV === 'test' ? 0 : env.PORT;

(async () => {
  const app = await startServer();

  // sync db
  await syncDb();
  app.listen(PORT, () => {
    if (env.NODE_ENV !== 'test') console.log(`running on ${PORT}`);
  });
})();

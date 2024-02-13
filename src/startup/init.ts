import { Express } from 'express';
import { APP_HOST, APP_PORT } from '../config/env';

const appSetup = (app: Express) => {
  app.listen(APP_PORT, () => {
    console.log(`Server started on port http://${APP_HOST}:${APP_PORT}`);
  });
};

export default appSetup;
import { Express, Request, Response } from 'express';
import { authRouter, productRouter, profileRouter } from '../routes';
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require('./swagger.json')


var options_api = {
  explorer: false,
  customCss: '.swagger-ui .topbar { display: none }'
};

const routerSetup = (app: Express) =>
  app
  


  .get('/', async (req: Request, res: Response) => {
    res.status(200).send({
      message:"Welcome to Jiji Demo Backend API"
    });
  })
  .use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument,options_api))
  .use("/account", authRouter)
  .use("/product", productRouter)
  .use("/profile", profileRouter)
  ;

export default routerSetup;
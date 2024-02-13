import cors from 'cors';
import { Express } from 'express';
import morgan from "morgan";
import path from 'path';

const securitySetup = (app: Express,express:any) =>
  app
  .use(cors())
  .use(morgan('dev'))
  .use(express.json())
  .use('/uploads', express.static(path.join(__dirname, '../../uploads')))

export default securitySetup;
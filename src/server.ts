import express, { Express, Router } from 'express';
import multer from 'multer';

import cookieParser from 'cookie-parser';
import { PORT } from './enviroments';
import cors from 'cors'; // Import cors package

export class ExpressServer {
  app: Express;
  PORT: number;
  upload: any;
  constructor() {
    this.app = express();
    this.PORT = PORT;
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors()); // Use cors middleware
    this.upload = multer({ dest: 'uploads/' }); // Define o diretório de destino para os uploads
  }

  addRouter(routes: Router) {
    this.app.use(routes);
  }
  use(path: string, routes: any) {
    this.app.use(path, routes);
  }
  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on http://localhost:${this.PORT}`);
    });
  }
}

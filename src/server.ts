import express, { Response, Request } from "express";
import { authRouter, productRouter, profileRouter } from "./routes";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require('./swagger.json')

var options = {
  explorer: false,
  customCss: '.swagger-ui .topbar { display: none }'
};

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,options))
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    message: "Hello world from json",
  });
});

app.use("/account", authRouter);
app.use("/product", productRouter);
app.use("/profile", profileRouter);

app.listen(3010, () => {
  console.log("Hello server started on port http://localhost:3010");
});

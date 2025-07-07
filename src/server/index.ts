import express from "express";
import cors from "cors";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { registerRoutes } from "./routes/apiRoutes.js";

const app = express();
const PORT = 3000;

const openapiDocument = YAML.load("./src/server/openapi.yaml");

app.use(cors());
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

// Register API routes
registerRoutes(app);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 API Docs at http://localhost:${PORT}/docs`);
});

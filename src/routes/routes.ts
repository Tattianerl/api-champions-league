import { Router } from "express";
import { playersController } from "../controllers/players-controller";

const routes = Router();

routes.get("/api/players", playersController.listAll);          
routes.get("/api/players/:id", playersController.getById);      
routes.post("/api/players", playersController.create);          
routes.put("/api/players/:id", playersController.update);      
routes.delete("/api/players/:id", playersController.delete);    

export default routes;
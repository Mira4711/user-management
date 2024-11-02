import { Router } from "express";
import RightsController from "../controllers/rights.controller";

class RightsRoutes {
  router = Router();
  controller = new RightsController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.create);
    this.router.delete("/:uuid", this.controller.delete);
  }
}

export default new RightsRoutes().router;

import { Router } from "express";
import RolesController from "../controllers/roles.controller";

class RolesRoutes {
  router = Router();
  controller = new RolesController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.create);
    this.router.put("/:uuid", this.controller.update);
    this.router.delete("/:uuid", this.controller.delete);
  }
}

export default new RolesRoutes().router;

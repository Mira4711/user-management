import { Router } from "express";
import UsersController from "../controllers/users.controller";

class UsersRoutes {
  router = Router();
  controller = new UsersController();

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

export default new UsersRoutes().router;

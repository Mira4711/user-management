import { Application } from "express";
import usersRoutes from "./users.routes";
import rolesRoutes from "./roles.routes";
import rightsRoutes from "./rights.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/users", usersRoutes)
    app.use("/roles", rolesRoutes)
    app.use("/rights", rightsRoutes)
  }
}

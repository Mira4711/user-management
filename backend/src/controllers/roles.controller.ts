//
import type { Request, Response } from "express";
import type { Role } from "../interfaces/interfaces";
import { readFile, writeFile } from "../utils/fs";
import { v4 as uuidv4 } from "uuid";

const dbFile: string = "roles.json";

export default class RolesController {
	async create(req: Request, res: Response) {
		try {
			const reqRole: Role = req.body;
			if (reqRole.name) {
				const rolesArray: Role[] = readFile<Role[]>(dbFile);

				// nur hinzufügen, wenn es nicht schon drin ist
				if (!rolesArray.some((item) => item.name === reqRole.name)) {
					const uuid = uuidv4();

					// TODO: Validierung der Inhalte einbauen
					rolesArray.push({ ...reqRole, uuid });
					writeFile<Role[]>(dbFile, rolesArray);

					res.status(201).json({
						message: "OK",
						list: rolesArray
					});
				} else {
					res.status(406).json({
						message: "KO",
						error: "Role exist"
					});
				}
			} else {
				res.status(400).json({
					message: "KO",
					error: "empty value"
				});
			}
		} catch (err) {
			res.status(500).json({
				message: "KO"
			});
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			const rolesArray = readFile<Role[]>(dbFile);
			res.status(200).json({
				message: "OK",
				list: rolesArray
			});
		} catch (err) {
			res.status(500).json({
				message: "KO"
			});
		}
	}

	async update(req: Request, res: Response) {
		try {
			const rolesArray: Role[] = readFile<Role[]>(dbFile);
			const newRolesArray: Role[] = rolesArray.map((item) =>
				item.uuid == req.params.uuid
					? { ...item, rights: req.body.rights }
					: item
			);
			writeFile<Role[]>(dbFile, newRolesArray);

			res.status(201).json({
				message: "OK",
				list: newRolesArray
			});
		} catch (err) {
			res.status(500).json({
				message: "KO"
			});
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const rolesArray: Role[] = readFile<Role[]>(dbFile);

			const newRolesArray: Role[] = rolesArray.filter(
				(item) => item.uuid !== req.params.uuid
			);
			writeFile<Role[]>(dbFile, newRolesArray);

			res.status(201).json({
				message: "OK",
				list: newRolesArray
			});
		} catch (err) {
			res.status(500).json({
				message: "KO"
			});
		}
	}
}

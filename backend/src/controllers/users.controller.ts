//
import type { Request, Response } from "express";
import type { User } from "../interfaces/interfaces";
import { readFile, writeFile } from "../utils/fs";
import { v4 as uuidv4 } from "uuid";

const dbFile: string = "users.json";

export default class UsersController {
	async create(req: Request, res: Response) {
		try {
			const reqUser: User = req.body;
			if (reqUser.mail) {
				const userArray: User[] = readFile<User[]>(dbFile);
				// // nur hinzufügen, wenn email address unique
				if (!userArray.some((item) => item.mail === reqUser.mail)) {
					const uuid = uuidv4();

					// TODO: Validierung der Inhalte einbauen
					userArray.push({ ...reqUser, uuid });
					writeFile<User[]>(dbFile, userArray);

					res.status(201).json({
						message: "OK",
						list: userArray
					});
				} else {
					res.status(406).json({
						message: "KO",
						error: "mail exist"
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
			const userArray = readFile<User[]>(dbFile);
			res.status(200).json({
				message: "OK",
				list: userArray
			});
		} catch (err) {
			res.status(500).json({
				message: "KO"
			});
		}
	}

	async update(req: Request, res: Response) {
		try {
			const userArray: User[] = readFile<User[]>(dbFile);
			const newUserArray: User[] = userArray.map((item) =>
				item.uuid == req.params.uuid ? { ...item, roles: req.body.roles } : item
			);
			writeFile<User[]>(dbFile, newUserArray);

			res.status(202).json({
				message: "OK",
				list: newUserArray
			});
		} catch (err) {
			res.status(500).json({
				message: "KO"
			});
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const userArray: User[] = readFile<User[]>(dbFile);

			const newUserArray: User[] = userArray.filter(
				(item) => item.uuid !== req.params.uuid
			);
			writeFile<User[]>(dbFile, newUserArray);

			res.status(200).json({
				message: "OK",
				list: newUserArray
			});
		} catch (err) {
			res.status(500).json({
				message: "KO"
			});
		}
	}
}

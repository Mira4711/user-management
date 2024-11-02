//
import type { Request, Response } from "express";
import type { Right } from "../interfaces/interfaces";
import { readFile, writeFile } from "../utils/fs";
import { v4 as uuidv4 } from "uuid";

const dbFile: string = "rights.json";

export default class RightsController {
	async create(req: Request, res: Response) {
		try {
			const reqRight: Right = req.body;
			if (reqRight.name) {
				const rightsArray: Right[] = readFile<Right[]>(dbFile);

				if (!rightsArray.some((item) => item.name === reqRight.name)) {
					const uuid = uuidv4();

					rightsArray.push({ uuid, name: reqRight.name });
					writeFile<Right[]>(dbFile, rightsArray);

					res.status(201).json({
						message: "OK",
						list: rightsArray
					});
				} else {
					res.status(406).json({
						message: "KO",
						error: "Right exist"
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
			const rightsArray = readFile<Right[]>(dbFile);
			res.status(200).json({
				message: "OK",
				list: rightsArray
			});
		} catch (err) {
			res.status(500).json({
				message: "KO"
			});
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const rightsArray: Right[] = readFile<Right[]>(dbFile);

			const newRightsArray: Right[] = rightsArray.filter(
				(item) => item.uuid !== req.params.uuid
			);
			writeFile<Right[]>(dbFile, newRightsArray);

			res.status(201).json({
				message: "OK",
				list: newRightsArray
			});
		} catch (err) {
			res.status(500).json({
				message: "KO"
			});
		}
	}
}

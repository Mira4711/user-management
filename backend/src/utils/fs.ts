//
import fs from "fs";
import type { Json } from "../interfaces/interfaces";

const dbFolder = "db/";
const emptyContent: Json = [];

export function readFile<T extends Json>(fileName: string): T {
	try {
		return JSON.parse(fs.readFileSync(dbFolder + fileName, "utf8"));
	} catch (err) {
		writeFile(fileName);
		return emptyContent as T;
	}
}

export function writeFile<T extends Json>(fileName: string, content?: T) {
	try {
		fs.writeFileSync(dbFolder + fileName, JSON.stringify(content || emptyContent));
	} catch (err) {
		console.error(err);
	}
}

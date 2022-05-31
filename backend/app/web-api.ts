/**
 * 2022 Patrik Forsberg <patrik.forsberg@coldmind.com>d
 */

import { Router }           from "express";
import * as bodyParser      from "body-parser";
import express              from "express";
import cors                 from "cors";
import { Response }         from "express";
import { Request }          from "express";
import * as fileUpload      from "express-fileupload";
import { injectable }       from "tsyringe";
import { Settings }         from "./app.const";

const fileUpload = require("express-fileupload");

export enum ImportFileType {
	Unknown   = "unknown",
	Inventory = "inventory",
	Products  = "products"
}

@injectable()
export class WebApi {
	app: express.Application;
	server: any;
	webRoutes: Router = Router();

	constructor() {
		this.initWebServer();
		this.listen();
	}

	private async initWebServer(): Promise<void> {
		console.log(`Web Api initialize...`);

		this.app = express();
		this.webRoutes.use(bodyParser.json());
		this.webRoutes.use(bodyParser.urlencoded({ extended: true }));
		this.webRoutes.use(fileUpload());
		this.webRoutes.use(cors());
		this.webRoutes.options('*', cors());

		this.webRoutes.post("/", async (req: any, res) => {
			console.log("Import data :: body ::", req.body);

			let type = ImportFileType.Unknown;

			if ("products" in req.body) {
				type = ImportFileType.Products
			}
			else if ("inventory" in req.body) {
				type = ImportFileType.Inventory
			}

			res.json(
				{
					result: type !== ImportFileType.Unknown ? "OK" : "NOT_OK",
					type  : type,
					data: JSON.stringify(req.body)
				}
			);
		});

		this.app.use(this.webRoutes);
	}

	public async listen(): Promise<boolean> {
		let result = true;

		try {
			this.server = await this.app.listen(Settings.listenPort, Settings.listenHost);
			console.log(`WebApi process successfully started :: ${ Settings.listenHost }:${ Settings.listenPort }`);
		}
		catch (err) {
			console.error(`Web Server :: bind :: error ::`, err);
			result = false;
		}

		return result;
	}
}

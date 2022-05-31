/**
 * Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import "reflect-metadata";
import { container } from "tsyringe";
import { WebApi }    from "./app/web-api";

export class Main {
	constructor() {
		container.resolve(WebApi);
	}
}

new Main();

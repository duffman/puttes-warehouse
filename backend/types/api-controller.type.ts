/**
 * 2021 Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { Router }  from "express";

export interface IRestApiController {
	baseRoute?: string;
	initRoutes(routes: Router): IRestApiController;
}

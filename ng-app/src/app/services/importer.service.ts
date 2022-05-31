import { Injectable }       from '@angular/core';
import { InventoryService } from "./inventory.service";
import { ProductsService }  from "./products.service";

@Injectable(
	{
		providedIn: 'root'
	}
)
export class ImporterService {

	constructor(
		private inventory: InventoryService,
		private products: ProductsService
	) { }

	public importJsonObj(jsonObj: any) {
		console.log("importer :: importJsonObj ::", jsonObj);

		if ("inventory" in jsonObj) {
			this.inventory.importEntries(jsonObj.inventory);
		}
		else if ("products" in jsonObj) {
			this.products.importEntries(jsonObj.products);
		}
	}
}

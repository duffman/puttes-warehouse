/**
 * 2022 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 */

import { Injectable }          from '@angular/core';
import { Subject }             from "rxjs";
import { IInventoryEntry }     from "../types/inventory.type";
import { IProductEntry }       from "../types/products.type";
import { InventoryService }    from "./inventory.service";
import { IItemManagerService } from "./item-manager.service";

@Injectable(
	{
		providedIn: 'root'
	}
)
export class ProductsService implements IItemManagerService {
	public products = new Array<IProductEntry>();

	constructor(
		private inventory: InventoryService) {
			inventory.onArticlesChange.subscribe(
				(val: IInventoryEntry[]) => {
					this.updateProducts()
				}
			)
	}

	public importEntries(entries: IProductEntry[]) {
		entries.forEach((entry: IProductEntry) => {
			this.addEntry(entry);
		});

		this.updateProducts();
	}

	private updateProducts() {
		const entries = this.products;

		entries.forEach((item: IProductEntry) => {
			item.inStock = this.inventory.partsForXProducts(item.contain_articles);
			console.log("Import Product ITEM >>> ::", item.name, ":: STOCK ::", this.inventory.partsForXProducts(item.contain_articles) );
		});
	}

	private addEntry(entry: IProductEntry) {
		//TODO: Check for doubles
		this.products.push(entry);
	}

	public haveItems(): boolean {
		return this.products.length > 0;
	}
}

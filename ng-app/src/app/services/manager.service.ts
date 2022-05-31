import { Injectable }       from '@angular/core';
import { Subject }          from "rxjs";
import { IInventory }       from "../types/inventory.type";
import { IInventoryEntry }  from "../types/inventory.type";
import { IProductEntry }    from "../types/products.type";
import { InventoryService } from "./inventory.service";
import { ProductsService }  from "./products.service";

@Injectable(
	{
		providedIn: 'root'
	}
)
export class ManagerService implements IItemManagerServicee{
	private inventory = new Array<IInventoryEntry>();
	private products = new Array<IProductEntry>();

	private _inventory = new Subject<IInventory[]>();
	public inventoryData = this._inventory.asObservable();

	private _products = new Subject<IProductEntry[]>();
	public productsData = this._inventory.asObservable();

	constructor(
		private inventoryService: InventoryService,
		private productsService: ProductsService) {

	}

	compile(): void {

	}
}

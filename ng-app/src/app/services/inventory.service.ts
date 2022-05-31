import { Injectable }          from '@angular/core';
import { Subject }             from "rxjs";
import { IInventoryEntry }     from "../types/inventory.type";
import { IProductEntry }       from "../types/products.type";
import { IProductArtInfo }     from "../types/products.type";
import { IItemManagerService } from "./item-manager.service";

@Injectable(
	{
		providedIn: 'root'
	})
export class InventoryService implements IItemManagerService {
	private _articleInventory = new Subject<IInventoryEntry[]>();
	public onArticlesChange = this._articleInventory.asObservable();
	public inventory: IInventoryEntry[] = new Array<IInventoryEntry>();

	constructor() {}

	public importEntries(entries: IInventoryEntry[]) {
		for (let item of entries) {
			this.addToInventory(item);
			console.log("Import Inventory ITEM >>> ::", item);
		}

		this._articleInventory.next(this.inventory);
	}

	/**
	 * With the current inventory calculate how many of the
	 * given product there are parts to make
	 * @param {IProductArtInfo[]} requiredParts
	 * @returns {number}
	 */
	public partsForXProducts(requiredParts: IProductArtInfo[]): number {
		let maxNumProducts: number = undefined;

		for (let reqArt of requiredParts) {
			let inventoryEntry = this.getEntryByArtId(reqArt.art_id);

			if (inventoryEntry) {
				let tmpNum = Math.floor(inventoryEntry.stock / reqArt.amount_of);

				if (tmpNum < maxNumProducts || !maxNumProducts) {
					maxNumProducts = tmpNum;
				}
			}
		}

		// If max possible products is undefined, no inventory might be
		// present to return 0
		if (!maxNumProducts) return 0;

		return maxNumProducts;
	}


	private getIndexOf(entry: IInventoryEntry): number {
		return this.inventory.findIndex(obj => obj.art_id === entry.art_id);
	}

	public addToInventory(entry: IInventoryEntry): void {
		 const entryIndex = this.getIndexOf(entry);

		 if (entryIndex > -1) {
			 console.log(`Entry with id "${ entry.art_id }" exists, removing it first...`);
			 this.inventory.splice(entryIndex, 1);
		 }

		 this.inventory.push(entry);
	}

	public removeFromInventory(artInfo: IProductArtInfo[]) {

		console.log("REMOVE FROM INVENTORY;::;:;:", artInfo);


		for (let info of artInfo) {
			const entry = this.getEntryByArtId(info.art_id);

			console.log("Got hold of entry-::::", entry);

			entry.stock = entry.stock - info.amount_of;
			entry.stock = entry.stock < 1 ? 0 : entry.stock;
		}

		this._articleInventory.next(this.inventory);
	}

	/**
	 * Retrieve an inventory entry by given article id
	 * @param {number} id
	 * @returns {IInventoryEntry | undefined}
	 */
	public getEntryByArtId(id: number): IInventoryEntry | undefined {
		const item = this.inventory.find(obj => obj.art_id === id);
		console.log("Inventory Manager :: getEntryById ::", item);
		return item;
	}

	public haveItems(): boolean {
		return this.inventory.length > 0;
	}
}

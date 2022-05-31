import { HttpClient }       from "@angular/common/http";
import { Component }        from '@angular/core';
import { ImporterService }  from "./services/importer.service";
import { InventoryService } from "./services/inventory.service";
import { ProductsService }  from "./services/products.service";
import { IProductEntry }    from "./types/products.type";
import validate = WebAssembly.validate;

@Component(
	{
			   selector   : 'app-root',
			   templateUrl: './app.component.html',
			   styleUrls  : [ './app.component.scss' ]
		   })
export class AppComponent {
	title              = 'ng-app';
	baseApiUrl         = 'http://127.0.0.1:3300/';
	file: File | undefined;
	showUploadBtn = false;

	constructor(
		private importerService: ImporterService,
		public inventoryService: InventoryService,
		public productsService: ProductsService,
		private httpClient: HttpClient) {
	}

	onChangeProd(event: any) {
		this.file = event.target.files[0];
		this.doUpload("products")
	}

	onChangeInventory(event: any) {
		this.file = event.target.files[0];
		this.doUpload("inventory")
	}

	sellProduct(entry: IProductEntry): void {
		console.log("Sell product ::", entry);
		this.inventoryService.removeFromInventory(entry.contain_articles)
	}

	doUpload(expectType?: string) {
		this.httpClient.post(this.baseApiUrl, this.file).subscribe(
			(event: any) => {

				console.log("event ::", event);

				if (typeof (event) === 'object') {
					if (event.result === "OK") {
						let jsonData = JSON.parse(event.data);

						if (expectType && event.type !== expectType) {
							alert("Invalid file type")
						} else {
							this.importerService.importJsonObj(jsonData);
						}
					} else {
						alert("Invalid file format");
					}
				}
			}
		);
	}
}

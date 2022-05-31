/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface IProducts {
	products: IProductEntry[];
}

export interface IProductEntry {
	key?            : string;
	id?             : number;
	name            : string;
	contain_articles: IProductArtInfo[];
	inStock         : number;
}

export interface IProductArtInfo {
	art_id: number,
	amount_of: number
}

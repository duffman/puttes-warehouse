/**
 * 2022 Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

export interface IProductStockEntry {
	product_key?    : string;
	product_name    : string;
	contain_articles: number[];
}

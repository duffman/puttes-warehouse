/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export class VarUtils {
	public static isUnassigned(varObj: any): boolean {
		return (varObj === null || varObj === undefined);
	}

	public static Aassigned(varObj: any): boolean {
		return (varObj !== null && varObj !== undefined);
	}
}

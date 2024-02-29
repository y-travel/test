interface IHelper {
	/**
	 *
	 * @param val number
	 * @param fromCurrency = USD
	 * @param toCurrency = IRR
	 * @returns number
	 */
	quasarSelectLabel(opt: any, entities: any[]): string;
	quasarSelectUpdate(opt: any): any;
	getKeyValues(enm: any, translate?: boolean): IKeyValue[];
	convertCurrency(val: number, fromCurrency?: string, toCurrency?: string): Promise<number>;
	patchTranslation(scopeName: string, local: any): void;
	isNilOrEmpty(val: any): boolean;
}
interface IKeyValue {
	id: string;
	name: string;
}
//TODO: should be completed and cache by time (e.g. by minute)
declare type currencyUnitT = 'IRR' | 'USD';

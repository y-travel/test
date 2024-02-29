interface IFormat {
	numberFormat(val: number | any, withSeparator?: boolean): string;

	currencyFormat(val: number | any, customSymbol?: string): string;

	//@TODO clean DRY
	timeFormat(val: number | any): string;

	getFullName(person: any): string;

	getFullNameEn(person: any): string;

	getCompositePrice(primary: number, secondary: number): string;
}

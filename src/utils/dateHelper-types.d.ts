/**
 * TODO should be completed
 */
interface IDateHelper {
	shamsiToMiladi(date: string, silence?: boolean): any;
	getQueryRangeDate: any;
	/**
	 *
	 * @param iso false
	 * @param shamsi false
	 * @param distance 0
	 */
	getNow(iso?: boolean, shamsi?: boolean, distance?: number): any;
	clampDate: any;
	getDayOfWeek: any;
	miladiToShamsi: any;
	toLocal: any;
	isSameRangeDate: any;
	toBase: any;
	getShortFormattedDate: any;
	/**
	 * @param from date
	 * @param to date
	 * @param number false
	 */
	getNights(from: string, to: string, number?: boolean): string | number;
	dateDiff: any;
	checkInfantInDate: any;
	checkBabyInDate: any;
	getIso: any;
	addToDate: any;
	isBetweenDates: any;
	sameDate: any;
	getMonthName: any;
	convertToCommonDate: any;
	convertToIsoDate: any;
	convertToIsoDateRange: any;
	convertToIsoDateRangeEx: any;
	dateRangeToIsoDateType: any;
	dateRangeToDateType(
		firstDate: string | { from: string; to: string },
		lastDate?: string | { from: string; to: string }
	): { fromDate: String; toDate: String };
	dateRangeToMiladi: any;
	dateRangeToShamsi: any;
	isValid: any;
	isValidEx: any;
	isValidDate: any;
	isValidDateRange: any;
	isValidDateRangeEx: any;
	dateTypeToDateRange(fromDate: any, toDate?: any): { from: string; to: string };
	getTimeLocal: any;
	isEqualDate: any;
	isEqualDateRange: any;
	sanitizeDateRange(item: any): IDateRange;
}

interface IDateRange {
	fromDate: string;
	toDate: string;
}

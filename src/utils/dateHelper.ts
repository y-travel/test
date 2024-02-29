import { date } from 'quasar';
import { loc } from 'boot/i18n';

//@TODO clean,use external lib.
const shamsiToMiladi = (date: string, silence = false) => {
	const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
	if (!isValidDate(date)) {
		if (!silence) {
			throw new Error('date is not valid');
		}
		return '';
	}
	const separatorChar = (date.indexOf('-') > 0 ? '-' : date.indexOf('/') > 0 ? '/' : undefined) as any;
	if (!separatorChar) {
		if (!silence) {
			throw new Error('invalid date:couldn`t find date separator');
		}
		return '';
	}
	let dateSplitted = date.split(separatorChar);
	var jy = parseInt(dateSplitted[0]) - 979;
	var jm = parseInt(dateSplitted[1]) - 1;
	var jd = parseInt(dateSplitted[2]) - 1;

	var j_day_no = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4);
	for (var i = 0; i < jm; ++i) j_day_no += j_days_in_month[i];

	j_day_no += jd;

	var g_day_no = j_day_no + 79;

	var gy = 1600 + 400 * Math.floor(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
	g_day_no = g_day_no % 146097;

	var leap = true;
	if (g_day_no >= 36525) {
		/* 36525 = 365*100 + 100/4 */
		g_day_no--;
		gy += 100 * Math.floor(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
		g_day_no = g_day_no % 36524;

		if (g_day_no >= 365) g_day_no++;
		else leap = false;
	}

	gy += 4 * Math.floor(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
	g_day_no %= 1461;

	if (g_day_no >= 366) {
		leap = false;

		g_day_no--;
		gy += Math.floor(g_day_no / 365);
		g_day_no = g_day_no % 365;
	}

	for (var i = 0; g_day_no >= g_days_in_month[i] + (i == 1 && leap ? 1 : 0); i++) g_day_no -= g_days_in_month[i] + (i == 1 && leap ? 1 : 0);
	var gm = i + 1;
	var gd = g_day_no + 1;

	return `${gy}/${gm < 10 ? '0' + gm : gm}/${gd < 10 ? '0' + gd : gd}`;
};
const getDateType = (value: string | Date) => (typeof value == 'string' ? new Date(value) : value);
const convertToIsoDate = (date: string) => (date as any)?.replaceAll('/', '-'); //@TODO remove any after convert to es2021
/**
 * @deprecated use it for old dateRange
 * @param dateRange
 * @returns
 */
const convertToIsoDateRange = (dateRange: any) => ({ from: convertToIsoDate(dateRange.from), to: convertToIsoDate(dateRange.to) });
const convertToIsoDateRangeEx = (dateRange: any) => ({ fromDate: convertToIsoDate(dateRange.fromDate), toDate: convertToIsoDate(dateRange.toDate) });
const convertToCommonDate = (date: string) => (date as any)?.replaceAll('-', '/'); //@TODO  remove any after convert to es2021
const getShortFormattedDate = (strDate: string, showWeekday = false) =>
	new Intl.DateTimeFormat('fa-IR', {
		timeZone: 'Iran',
		month: 'long',
		day: '2-digit',
		weekday: showWeekday ? 'short' : undefined,
	}).format(getDateType(strDate));

const getMonthName = (strDate: string | Date) =>
	new Intl.DateTimeFormat('fa-IR', {
		timeZone: 'Iran',
		month: 'long',
	}).format(getDateType(strDate));

const toLocal = (date: any) => miladiToShamsi(date); //@TODO when localization implemented
const toBase = (date: any) => shamsiToMiladi(date);
const miladiToShamsi = (date: any = undefined): string =>
	date
		? new Intl.DateTimeFormat('fa-IR', {
				timeZone: 'Iran',
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				numberingSystem: 'latn',
		  } as any).format(getDateType(date))
		: ''; //@TODO clean,the best returned value is undefined

const getTimeLocal = (srcDate: any) => new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' }).format(getDateType(srcDate));
//@TODO localize
const getIso = (date: string | Date) =>
	new Intl.DateTimeFormat('sv-SE', {
		timeZone: 'Iran',
	}).format(typeof date == 'string' ? new Date(date) : date);
//@TODO distance work for all return types.
const getNow = (iso = false, shamsi = false, distance = 0) => {
	return shamsi
		? miladiToShamsi(addToDate(new Date(), distance))
		: iso
		? getIso(addToDate(new Date(), distance)).split('T')[0] // e.g. '2022-04-05'
		: addToDate(new Date(), distance).toLocaleString(); // e.g. '4/5/2022, 10:02:02 AM'
};
/**
 * @deprecated use Utils.date.getNights instead
 */
const getNights = (from: string, to: string, number = false): any => {
	let nightCount = Math.round(date.getDateDiff(new Date(to), new Date(from), 'days'));
	nightCount = isFinite(nightCount) ? nightCount : 0;
	return number ? nightCount : `${Utils.format.numberFormat(nightCount)} ${loc('night')}`;
};
const isBetween = (firstNumber: number, lastNumber: number, value: number) => value >= firstNumber && value <= lastNumber;

const dateDiff = (startDate: any, endDate: any): number => Math.round(date.getDateDiff(getDateType(endDate), getDateType(startDate), 'days'));

const isEqualDateRange = (srcDateRange: IDateRange, trgDateRange: IDateRange): boolean =>
	isEqualDate(getDateType(srcDateRange?.fromDate), getDateType(trgDateRange?.fromDate)) &&
	isEqualDate(getDateType(srcDateRange?.toDate), getDateType(trgDateRange?.toDate));

const isEqualDate = (srcDate: any, trgDate: any): boolean => date.getDateDiff(getDateType(srcDate), getDateType(trgDate), 'days') == 0;

const checkInfantInDate = (birthDate: string, date: string) => {
	return birthDate ? isBetween(0, 728, dateDiff(birthDate, date)) : undefined;
};

const checkBabyInDate = (birthDate: string, date: string) => (birthDate ? isBetween(729, 1825, dateDiff(birthDate, date)) : undefined);

const addToDate = (srcDate: any, days: number) =>
	days > 0 ? date.addToDate(getDateType(srcDate), { days: days }) : date.subtractFromDate(getDateType(srcDate), { days: Math.abs(days) });

const isBetweenDates = (targetDate: any, startDate: string, endDate: string) =>
	date.isBetweenDates(typeof targetDate == 'object' ? targetDate : new Date(targetDate), new Date(startDate), new Date(endDate), {
		onlyDate: true,
		inclusiveFrom: true,
		inclusiveTo: true,
	} as any);

const sameDate = (sourceDate: any, targetDate: any) => {
	return date.isSameDate(sourceDate, targetDate);
};
/**
 * @deprecated use iValidEx instead for new dateRange
 * @param srcDate
 * @returns
 */
const isValid = (srcDate: any) => isValidDate(srcDate) || isValidDateRange(srcDate);
const isValidEx = (srcDate: any) => isValidDate(srcDate) || isValidDateRangeEx(srcDate);
/**
 * @deprecated use isValidDateRange just for old type of daterange
 * @param srcDate
 * @returns
 */
const isValidDateRange = (srcDate: any) => typeof srcDate == 'object' && isValidDate(srcDate?.to) && isValidDate(srcDate?.from);

const isValidDateRangeEx = (srcDate: any) => typeof srcDate == 'object' && isValidDate(srcDate?.toDate) && isValidDate(srcDate?.fromDate);

const isValidDate = (srcDate: string) => srcDate?.length == 10 && date.isValid(srcDate);

const getQueryRangeDate = (fromDate: string, toDate: string, index = 0) =>
	`filters[$and][${index}][$or][0][$and][0][fromDate][$lte]=${fromDate}&filters[$and][0][$or][0][$and][1][toDate][$gte]=${fromDate}` +
	`&filters[$and][${index}][$or][1][$and][0][fromDate][$lte]=${toDate}&filters[$and][0][$or][1][$and][1][toDate][$gte]=${toDate}` +
	`&filters[$and][${index}][$or][2][$and][0][fromDate][$gte]=${fromDate}&filters[$and][0][$or][2][$and][1][toDate][$lte]=${toDate}`;

const FA_IR_LOCAL_DAYS = [1, 2, 3, 4, 5, 6, 0];
const getLocalDays = () => FA_IR_LOCAL_DAYS;
//we use .toISOString() because of date may be changed from outside and it depend's on localization on user computer.
const getDayOfWeek = (value: string | Date, localized = true): number =>
	localized ? getLocalDays()[getDayOfWeek(value, false) ?? 0] : (typeof value == 'string' ? new Date(value) : new Date(value.toUTCString())).getDay();

const clampDate = (dateValue: any, minDate: any, maxDate: any) => {
	const startDiff = dateDiff(minDate, dateValue);
	const endDiff = dateDiff(maxDate, dateValue);
	return startDiff <= 0 ? minDate : endDiff > 0 ? maxDate : dateValue;
};

const dateRangeToIsoDateType = (dateRange: any) => ({ fromDate: getIso(dateRange.from), toDate: getIso(dateRange.to) });
const dateRangeToDateType = (firstDate: any, lastDate = undefined) => ({
	fromDate: firstDate?.from ?? firstDate,
	toDate: (lastDate ?? firstDate)?.to ?? lastDate ?? firstDate,
});
const dateTypeToDateRange = (firstDate: any, lastDate = undefined) => ({
	from: firstDate?.fromDate ?? firstDate,
	to: (lastDate ?? firstDate)?.toDate ?? lastDate ?? firstDate,
});

const dateRangeToMiladi = (dateRange: any) => ({ from: shamsiToMiladi(dateRange.from), to: shamsiToMiladi(dateRange.to) });

const dateRangeToShamsi = (dateRange: any) => ({ from: miladiToShamsi(dateRange.from), to: miladiToShamsi(dateRange.to) });

const isSameRangeDate = (item: IDateRange) => item?.fromDate == item?.toDate;

const sanitizeDateRange = (item: any): IDateRange => {
	const { fromDate, toDate } = item;
	return { fromDate, toDate };
};
export {
	shamsiToMiladi,
	getQueryRangeDate,
	getNow,
	clampDate,
	getDayOfWeek,
	miladiToShamsi,
	toLocal,
	toBase,
	isSameRangeDate,
	getShortFormattedDate,
	getNights,
	dateDiff,
	checkInfantInDate,
	checkBabyInDate,
	getIso,
	addToDate,
	isBetweenDates,
	sameDate,
	getMonthName,
	convertToCommonDate,
	convertToIsoDate,
	convertToIsoDateRange,
	convertToIsoDateRangeEx,
	dateRangeToIsoDateType,
	dateRangeToDateType,
	dateRangeToMiladi,
	dateRangeToShamsi,
	isValid,
	isValidEx,
	isValidDate,
	isValidDateRange,
	isValidDateRangeEx,
	dateTypeToDateRange,
	getTimeLocal,
	isEqualDate,
	isEqualDateRange,
	sanitizeDateRange,
};

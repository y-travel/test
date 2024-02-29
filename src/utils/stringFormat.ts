const numberFormat = (val: number | any, withSeparator = true): string =>
	Intl.NumberFormat('fa-IR', {
		useGrouping: withSeparator,
	}).format(val ?? null);

const currencyFormat = (val: number | any, customSymbol = undefined || ''): string => {
	const symbol =
		Intl.NumberFormat('fa-IR', {
			currency: !customSymbol ? 'IRR' : customSymbol,
			style: !customSymbol ? undefined : 'currency',
		})
			.formatToParts(val ?? null)
			.find((x) => x.type == 'currency')?.value ?? '';
	return `${numberFormat(val, true)} ${symbol}`;
};

//@TODO clean DRY
const timeFormat = (val: number | any) => {
	val = val?.indexOf(':') > 0 ? val : '00:00';
	return `${Intl.NumberFormat('fa', { minimumIntegerDigits: 2 }).format(val.split(':')[0])}:${Intl.NumberFormat('fa', {
		minimumIntegerDigits: 2,
	}).format(val.split(':')[1])}`;
};

const getFullName = (person: any) => `${person?.name ?? ''} ${person?.family}`;
const getFullNameEn = (person: any) => `${person?.nameEn ?? ''} ${person?.familyEn}`;

const getCompositePrice = (primary: number, secondary: number) =>
	`${currencyFormat(primary, 'IRR')}${secondary ? ` + ${currencyFormat(secondary, 'USD')}` : ''}`;

export { currencyFormat, numberFormat, timeFormat, getFullName, getFullNameEn, getCompositePrice };

const columns = [
	{
		name: 'name',
		align: 'left',
		field: 'name',
	},
	{
		name: 'description',
		align: 'left',
		field: 'description',
		class: () => 'col-xs-12',
	}
];

const filters = {
	dateRange: {
		param: true,
		name: 'month',
		val: { from: '', to: '' },
		result: [],
	},
	hotels: {
		param: true,
		name: 'hotel',
		val: undefined,
		result: [],
	},
	monthOption: {
		param: true,
		name: 'inclusiveFirstDate',
		val: false,
	},
};

export { columns, filters };

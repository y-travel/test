import _difference from 'lodash/difference';
import _isNil from 'lodash/isNil';
import { useRouter } from 'vue-router';
import { watch } from 'vue';

import { BABY_ID, INFANT_ID } from './constants';
import { loc } from 'src/boot/i18n';
import { requestGet } from 'services';
import i18n from '../i18n';

const serviceNames = [
	{ id: 0, name: '_service.adult' },
	{ id: 1, name: '_service.infant' },
	{ id: 3, name: '_service.noBed' },
	{ id: 4, name: '_service.noBedNoFoodNoSeat' },
	{ id: 5, name: '_service.noBedNoFood' },
];
const getInvertedServiceName = (source: any, target: any): string => {
	const diffs = _difference(source?.map((x: any) => x.id) ?? [], target?.map((x: any) => x.id) ?? []);
	if (!diffs || diffs.length == 0) return '';
	return `بدون ${source
		?.filter((x: any) => diffs?.find((y) => y == x.id))
		?.flatMap((x: any) => loc(x.name))
		.join(',')}`;
};
enum hotelServiceT {
	food = 1,
	seat = 6,
	room = 8,
}
enum packageServiceT {
	ticket = 13,
	infant = 12,
}
enum ageGroupT {
	adult = 0,
	infant = 1,
	baby = 2,
}
enum mealT {
	breakfast = 2,
	lunch = 3,
	dinner = 4,
}
enum reportT {
	passengerList = 1,
	ticket = 2,
	ensurance = 3,
	reserved = 4,
	packageAgency = 5,
	hotelVoucher = 6,
}
enum personT {
	passenger = 0,
	guest = 1,
}
enum roomTypeT {
	singleBed = 2,
	twoSingleBed = 1,
	threeSingleBed = 3,
	fourSingleBed = 4,
	fiveSingleBed = 5,
}
enum transferT {
	land = 1,
	air = 2,
}
enum priceType {
	IRR = 1,
	USD = 2,
}
enum docType {
	package = 1,
	hotel = 2,
	agency = 3,
}
const originalServices = [
	{ id: 1, name: 'food' },
	{ id: 6, name: 'seat' },
	{ id: 8, name: 'room' },
]; //@TODO get from server
enum currencyUnitT {
	IRR = 1,
	USD = 2,
}
const getServiceName = (passenger: any, srcServices: any = undefined): string =>
	passenger.ageGroup == INFANT_ID ? 'infant' : getInvertedServiceName(srcServices ?? originalServices, passenger.services);

const printUrl = (URL: string) => {
	let W: any = window.open(URL);
	W.window.print();
};
const isInfant = (person: any) => person.ageGroup == INFANT_ID;
const isBaby = (person: any) => person.ageGroup == BABY_ID;
const hasBedService = (passenger: any) => {
	return passenger.ageGroup != INFANT_ID && passenger.services?.find((x: any) => x.id == hotelServiceT.room);
};
const getLocalRoomName = (roomType: any) => loc(`${roomType?.name ?? 'sharing'}`);

const validationRoom = (room: any) => {
	const passengerCount = room.passengers.filter((x: any) => hasBedService(x)).length;
	const minCount = room.roomType.minCapacity ?? room.roomType.capacity;
	const maxCount = room.roomType.maxCapacity ?? room.roomType.capacity;
	return !room.roomType
		? undefined
		: passengerCount < minCount
		? {
				val: -1,
				message: loc('msg.guestCountShouldBeMoreThan', {
					count: passengerCount,
					room: getLocalRoomName(room.roomType),
				} as any),
		  }
		: passengerCount > maxCount
		? {
				val: 1,
				message: loc('msg.guestCountShouldNotBeMoreThan', {
					count: maxCount,
					room: getLocalRoomName(room.roomType),
				} as any),
		  }
		: undefined;
};

const quasarSelectLabel = (opt: any, entities: any[]) => opt?.name ?? (opt ? entities.find((x: any) => x.id == opt)?.name : 'null');

const quasarSelectUpdate = (opt: any) => opt?.id ?? opt;

const selectDistinct = (arr: any[], key: any) =>
	arr.filter((x: any, index: number, array: any[]) => array.map((z) => z[key]).indexOf(x[key]) === index);

const getEnumNames = (enm: any) => Object.keys(enm)?.filter((x: any) => isNaN(parseInt(x)));

const getEnumValues = (enm: any) => Object.keys(enm)?.filter((x: any) => isFinite(parseInt(x)));

const getKeyValues = (enm: any, translate = false) => getEnumNames(enm).map((x: any) => ({ id: enm[x], name: translate ? loc(x) : x } as IKeyValue));

const groupByItem = (items: any, key: any, mapper: any) =>
	items.reduce((arr: any, x: any) => {
		if (!arr[x[key]]) {
			arr[x[key]] = [mapper(x)];
		} else {
			arr[x[key]].push(mapper(x));
		}
		return arr;
	}, {});

const getSafeId = (entity: any) => entity ?? entity?.id;

const usePageChanges = (callback: any) => {
	watch(useRouter().currentRoute, async (newvalue, oldvalue) => {
		//prevent to call init when path is different
		if (oldvalue.name != newvalue.name) {
			return;
		}
		callback(newvalue.query);
	});
};

const getFilter = (filter: any): string => {
	let strFilter = '';
	let index = 0;
	for (const key in filter) {
		const item = filter[key];
		if (_isNil(item.val) || item.val.length == 0) {
			continue;
		}
		if (item.param) {
			strFilter +=
				(typeof item.val == 'object'
					? Object.keys(item.val)
							.map((key) => key + '=' + encodeURIComponent(item.val[key]))
							.join('&')
					: `${item.name}=${encodeURIComponent(item.val)}`) + '&';
			continue;
		}

		if (typeof item.val == 'object') {
			strFilter += item.val.reduce((res: any, x: any) => (res += `filters[$and][0][${item.name.replaceAll('.', '][')}][$in]=${x}&`), '');
		} else if (item.name.indexOf(',') >= 0) {
			strFilter += item.name.split(',').reduce((res: any, x: any) => (res += `filters[$or][${index++}][${x}][$contains]=${item.val}&`), '');
		} else {
			strFilter += `filters[$and][${index++}][${item.name.replaceAll('.', '][')}]=${item.val}&`;
		}
	}
	return strFilter;
};
const changeLayoutDirection = (dir: string) => {
	const htmlEl = document.querySelector('html');
	htmlEl?.setAttribute('dir', dir);
};
const changeImagesBaseUrl = (element: any) => {
	const imgPaths = ['--img-footer', '--img-sub-menu', '--img-logo'];
	const styles = getComputedStyle(element);
	for (let imgPath of imgPaths) {
		const propVal = styles.getPropertyValue(imgPath);
		if (!propVal.startsWith('url(/..')) {
			element.style.setProperty(imgPath, styles.getPropertyValue(imgPath).replace('url(', 'url(..'));
		}
	}
};

//TODO: should be completed and cache by time (e.g. by minute)
const convertCurrency = async (val: number, fromCurrency = 'USD', toCurrency = 'IRR') =>
	val * ((await requestGet('config'))?.data ?? {})[`${fromCurrency.toLowerCase()}_${toCurrency.toLocaleLowerCase()}`] ?? 0;

const patchTranslation = (scopeName: string, local: any) => {
	for (const localName in local) {
		i18n[localName as TLang] = { ...i18n[localName as TLang], ...({ [scopeName]: { ...local[localName] } } as any) };
	}
};
const isNilOrEmpty = (val: any) => _isNil(val) || val == '';
export {
	getServiceName,
	originalServices,
	hotelServiceT,
	mealT,
	reportT,
	personT,
	roomTypeT,
	transferT,
	ageGroupT,
	packageServiceT,
	priceType,
	docType,
	getSafeId,
	printUrl,
	isBaby,
	isInfant,
	hasBedService,
	validationRoom,
	quasarSelectLabel,
	quasarSelectUpdate,
	groupByItem,
	selectDistinct,
	getEnumNames,
	getEnumValues,
	getKeyValues,
	usePageChanges,
	getFilter,
	changeLayoutDirection,
	changeImagesBaseUrl,
	convertCurrency,
	currencyUnitT,
	patchTranslation,
	isNilOrEmpty
};

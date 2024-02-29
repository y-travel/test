interface INew<T> {
	prototype: T;
	new (): T;
}

//@TODO property of these interfaces not showing in vue files that's why declared here as workaround solution

interface IUtils extends INew<IUtils> {
	auth: IAuth;
	date: IDateHelper;
	helper: IHelper;
	format: IFormat;
}
interface IFilter {
	currencyFormat: (val: any, customSymbol?: string) => string;
	numberFormat: (val: any, withSeparator?: boolean) => string;
	timeFormat: (val: any) => string;
	toLocal: (date: any) => string;
}
interface IValidationRule {
	required: ((val: any) => string | true)[];
	nationalCode: ((val: any) => string | true)[];
	passportNo: ((val: any) => string | true)[];
	mobileNo: ((val: any) => string | true)[];
	NumRequired: ((val: any) => string | true)[];
	dateRangeRequired: ((val: any) => string | true)[];
	dateMoreThan: (baseDate: string, days: number) => ((val: any) => string | true)[];
	date: (local?: string) => ((val: any) => string | true)[];
	email: ((val: any) => string | true)[];
}
interface IService extends INew<IService> {
	api: IApiService;
	pkg: IPackageService;
	cms: ICmsService;
	hotel: IHotelService;
	shared: any;
	agency: any;
	room: IRoomService;
	img: IImageService;
	math: IMathService;
	report: IReportService;
	user: IUserService;
}

interface IProcess {
	env: NodeJS.ProcessEnv;
}

declare type TLang = 'fa-IR' | 'en-US';

declare var Utils: IUtils;

declare var Service: IService;

declare var process: IProcess;

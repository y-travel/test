declare enum EReportType {
	passenger = 1,
	ticket = 2,
	insurance = 3,
	reservedList = 4,
	packageAgencies = 5,
	hotelVoucher = 6,
}
declare enum EReportFormat {
	excel,
	pdf,
}
declare var EReportTypeVal: typeof EReportType;

declare type TReportType = keyof typeof EReportType;

declare type TReportFormat = keyof typeof EReportFormat;

declare interface IReportService {
	getReportLink(report: TReportType, format: TReportFormat, config: any): string;

	getReportBaseUrl(): string;
}

import { api } from 'boot/axios';
//TODO: replace report number from api to delete this enum and just use type of it, to decrease using enum
enum EReportType {
	insurance = 3,
	ticket = 2,
	passenger = 1,
	reservedList = 4,
	packageAgencies = 5,
	hotelVoucher = 6,
}
//TODO: remove initializing enum in globalThis by reducing use of enum
const boot = () => {
	globalThis.EReportTypeVal = EReportType;
};

const getReportBaseUrl = () => api.defaults.baseURL;

const getReportLink = (report: TReportType, format: TReportFormat, config: {}) =>
	`${getReportBaseUrl()}/api/report/${format}?${new URLSearchParams({ reportType: EReportTypeVal[report].toString(), ...config }).toString()}`;

export { getReportBaseUrl, getReportLink, boot };

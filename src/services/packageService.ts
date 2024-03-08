import { loc } from 'src/boot/i18n';
import { requestGet } from './apiService';
enum TPackageStatus {
	Completed = 1,
	Active = 2,
	Done = 4,
	Running = 8,
}

const getPackage = async (id: string, query = '') => (id ? (await requestGet(`packages/${id}`, query, { noAuth: true } as any)).data : undefined);

const getFilter = (status: TPackageStatus | undefined) => {
	let statusFilter = '';

	switch (status + '') {
		case TPackageStatus.Completed + '':
			statusFilter = `filters[$and][0][isComplete]=true`;
			break;
		case TPackageStatus.Done + '':
			statusFilter = `filters[$or][0][isActive]=false`;
			break;
		case TPackageStatus.Running + '':
			statusFilter = `filters[isRunning]=true`;
			break;
		default:
			//return not running packages as default filter
			statusFilter = `filters[$and][0][isActive]=true&filters[$and][0][isRunning]=false`;
			break;
	}
	return `${statusFilter}`;
};
const getPackages = async ({ pageNo, rowsPerPage }: any, status: TPackageStatus | undefined, query: string): Promise<any> => {
	return await requestGet('packages', `pagination[start]=${pageNo ?? 0}&pagination[limit]=${rowsPerPage ?? 0}&${getFilter(status)}&${query}`, {
		noAuth: true,
	} as any);
};
const getPackagesAsync = async (val: any, update: any, abort: any, callback: any) => {
	if (val.length < 1) {
		abort();
		callback([]);
		return;
	}

	update(async () => {
		const tmpData = (await requestGet('packages', `filters[$and][0][name][$contains]=${val}`)).data;
		callback(tmpData);
	});
};

const getDisplayName = (pkg: any) => `${loc('tour')} ${pkg.departure?.name}  ${Utils.date.getShortFormattedDate(pkg.startDate)}`;

const calculateTotalPrice = (item: any) =>
	(item.basePrice ?? 0) + item.packageService?.filter((x: any) => x.formulated).reduce((sum: any, x: any) => (sum += parseInt(x.price)), 0) ?? 0;

export { getPackage, getPackages, TPackageStatus, getPackagesAsync, getDisplayName, calculateTotalPrice };

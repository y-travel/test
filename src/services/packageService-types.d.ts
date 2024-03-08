interface IPackageService {
	getPackages({ pageNo, rowsPerPage }: any, status: any, query: string): Promise<any>;
	getPackage(id: string, query?: string): Promise<any>;

	getPackagesAsync(val: any, update: any, abort: any, callback: any): Promise<any>;

	calculateTotalPrice(item: any): number;
	getDisplayName(pkg: any): string;
}

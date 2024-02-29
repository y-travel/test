interface IRoomService {
	/**
	 *
	 * @param pagination
	 * @param query
	 */
	getRoomReservations(pagination: any, query: string): Promise<any>;

	getRoomReservation(id:string, query?: string): Promise<any>;

	getPackageRoomPrice(roomType: any, packageService: any[]): number;
	/**
	 *
	 * @param packageId
	 * @param id
	 * @param data
	 * @param config undefined
	 */
	packageRoomUpsert(packageId: string, id: string, data: any, config?: any): Promise<any>;

	packageRoomDelete(packageId: string, id: string): Promise<any>;
}


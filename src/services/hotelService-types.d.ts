interface IHotelService {
	/**
	 *
	 * @param query string
	 * @param pagination false
	 */
	getHotels(query: string, pagination?: boolean): Promise<any>;

	getHotel(id: string, query?: string): Promise<any>;
	getHotelReservation(reservationId: string | undefined, populate?: string): Promise<any>;

	getHotelReservations(queryString?: string): Promise<any>;

	getTemporaryHotelReservation(token: string, populate?: string): Promise<any>;
	/**
	 * @deprecated caution use  Service.hotel.getRoomTypeStatsEx if your dateRange is new format,try to change all dateRange to new format
	 * @param dateRange
	 * @param hotelIds
	 * @param queryString
	 * @returns
	 */
	getRoomTypeStats(dateRange: { from: string; to: string }, hotelIds: any[], queryString?: string): Promise<string>;

	getRoomTypeStatsEx(
		dateRange: { fromDate: string; toDate: string },
		hotelIds: any[],
		queryString?: string,
		byRoomType?: boolean
	): Promise<IRoomTypeStats>;

	temporaryReserveHotel(data: IHotelReservation): Promise<any>;

	hotelRoomReserveUpsert: (hotelId: string, id: string, data: any) => {};

	hotelRoomReserveDelete: (hotelId: string, id: string) => {};

	fillHotelWithStats(hotel: any, stats: any): void;

	getRoomPrice(roomId: any, stats: any): number;

	getTotalRoomPrice(roomId: any, config: { stats: any; dateRange: IDateRange; discount: number }): number;

	getAllHotelServices(): Promise<any>;

	hotelReservationUpsert(id: string, data: any): Promise<any>;
}

interface IHotelTypeService {
	roomType: { id: number };
	count: number;
	price: number;
	currencyUnit: currencyUnitT;
	totalPrice: number;
}
interface IHotelReservation {
	hotel: any;
	services: IHotelTypeService[];
	fromDate: string;
	toDate: string;
	buyer?: any;
	status: THotelReservationStatus;
	roomReservations?: any[];
}
interface IRoomTypeStats {
	priceStats: IRoomTypePriceStats[];
	reservedStats: IRoomTypeReserveStats[];
}
interface IRoomTypePriceStats {
	hotel_id: number;
	min_price: number;
	max_price: number;
	room_type_id: number;
}
interface IRoomTypeReserveStats {}
interface IHotel {
	id: number;
	price: { min: number; max: number };
}
declare type TBuyerType = 'agency' | 'flightAgency' | 'person';
declare type THotelReservationStatus = 'created' | 'reserved' | 'registered' | 'ended';

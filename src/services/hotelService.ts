import { requestDelete, requestGet, requestUpsert } from './apiService';

const getHotels = async (query: string, pagination = false) => {
	const res = await requestGet('hotels', query, { noAuth: true } as any);
	return pagination ? res : res.data;
};

const getHotel = async (id: string, query = '') => (id ? (await requestGet(`hotels/${id}`, query, { noAuth: true } as any)).data : undefined);
const getHotelReservation = async (reservationId: string | undefined, populate?: string) =>
	reservationId
		? (
				await requestGet(`hotel-reservations/${reservationId}`, `populate=stats,services.service,services.roomType,${populate}`, {
					defaultNotify: {
						notify: true,
					},
				})
		  )?.data
		: undefined;

const getHotelReservations = async (queryString?: string) => await requestGet(`hotel-reservations`, `${queryString}`);
/**
 * @param token
 * @param populate
 * @returns
 */
const getTemporaryHotelReservation = async (token: string, populate?: string) =>
	(
		await requestGet(`hotel-reservations/temp/${token}`, `populate=stats,services.service,services.roomType,${populate}`, {
			defaultNotify: {
				notify: true,
			},
		})
	)?.data;

/**
 * @deprecated use Service.hotel.getRoomTypeStats instead
 * @param dateRange
 * @param hotelIds
 * @param queryString
 * @returns
 */
const getRoomTypeStats = async (dateRange: { from: string; to: string }, hotelIds: any[], queryString = '') =>
	(
		await requestGet(
			'hotels/room-type-stats',
			`fromDate=${dateRange.from}&toDate=${dateRange.to}&hotelId=${hotelIds?.join(',')}&byRoomType=true&${queryString}`
		)
	).data;
const getRoomTypeStatsEx = async (dateRange: IDateRange, hotelIds: any[], queryString = '', byRoomType = true) =>
	(
		await requestGet(
			'hotels/room-type-stats',
			`fromDate=${dateRange.fromDate}&toDate=${dateRange.toDate}&hotelId=${hotelIds?.join(',')}&${byRoomType ? 'byRoomType=true' : ''}&${queryString}`
		)
	).data as IRoomTypeStats;

/**
 * return token is for new reservation
 * and in the future can access just by this token.
 * @param data
 * @returns
 */
const temporaryReserveHotel = async (data: IHotelReservation) => {
	const res = await requestUpsert('hotel-reservations/temp', undefined, data, {
		defaultNotify: {
			notify: true,
			successMessage: 'msg.hotelTemporaryReservationNotify',
			failedMessage: 'msg.errorDuringHotelReservation',
		},
	});
	return res;
};

const hotelRoomReserveUpsert = async (hotelId: string, id: string, data: any) => await requestUpsert(`hotels/${hotelId}/rooms`, id, data);

const hotelRoomReserveDelete = async (hotelId: string, id: string) => await requestDelete(`hotels/${hotelId}/rooms/${id}`);

const hotelReservationUpsert = async (id: string, data: any) => (await requestUpsert('hotel-reservations', id, data)).data;

const fillHotelWithStats = (hotel: any, stats: any) => {
	for (const stat in (hotel.stats ?? {}) as any) {
		const tmpReservedStat = stats.reservedStats.find((x: any) => x.hotel_id == hotel.id && x.room_type_id == hotel.stats[stat].id);
		const tmpPriceStat = stats.priceStats.find((x: any) => x.hotel_id == hotel.id && x.room_type_id == hotel.stats[stat].id);
		hotel.stats[stat].reserved = tmpReservedStat?.sum ?? 0;
		hotel.stats[stat].price = { min: tmpPriceStat?.min_price, max: tmpPriceStat?.max_price };
	}
};
const getRoomPrice = (roomId: string, stats: any) => (Object.values(stats ?? {})?.find((x: any) => x.id == roomId) as any)?.price?.max ?? 0;
const getTotalRoomPrice = (roomId: any, config: { stats: any; dateRange: IDateRange; discount: number }) => {
	const roomPrice = getRoomPrice(roomId, config.stats);
	const nightCount = Utils.date.getNights(config.dateRange?.fromDate, config.dateRange?.toDate, true) as number;
	return (
		(config.discount || !Utils.date.isValidDateRangeEx(config.dateRange) ? Service.math.getPercent(roomPrice, config.discount) : roomPrice) *
		(nightCount ? nightCount : 1)
	);
};
const getAllHotelServices = async () => (await requestGet('hotel-services'))?.data;

export {
	getHotels,
	getHotel,
	getHotelReservation,
	getTemporaryHotelReservation,
	getRoomTypeStats,
	temporaryReserveHotel,
	fillHotelWithStats,
	getRoomTypeStatsEx,
	getTotalRoomPrice,
	getRoomPrice,
	getAllHotelServices,
	hotelRoomReserveUpsert,
	hotelRoomReserveDelete,
	hotelReservationUpsert,
	getHotelReservations,
};

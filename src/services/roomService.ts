import { requestDelete, requestGet, requestUpsert } from './apiService';

const getRoomReservations = async (pagination: any, query: string) =>
	await requestGet('room-reservations', `pagination[start]=${pagination.pageNo}&pagination[limit]=${pagination.rowsPerPage}&${query}`);

const getRoomReservation = async (id: string, query = '') => (await requestGet(`room-reservations/${id}`, query))?.data;

const getPackageRoomPrice = (roomType: any, packageService: any[]) =>
	packageService.find((x: any) => x.roomType?.id == (roomType?.id ?? roomType ?? 0))?.price ?? 0;

const packageRoomUpsert = async (packageId: string, id: string, data: any, config = undefined) =>
	await requestUpsert(`packages/${packageId}/rooms`, id, data, config);

const packageRoomDelete = async (packageId: string, id: string) => await requestDelete(`packages/${packageId}/rooms/${id}`);

export { getPackageRoomPrice, packageRoomUpsert, packageRoomDelete, getRoomReservations, getRoomReservation };

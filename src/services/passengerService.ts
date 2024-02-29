import { INFANT_ID } from 'utils/constants';
import { getPackageRoomPrice } from './roomService';

//@TODO packageService should be replaced with reservationService after propagation update on reservation packageService's price implemented.
const calculatePassengerPrice = (passenger: any,basePrice:number,reservationService:any[],packageService:any[]) => {
  const servicePrice = packageService
    .filter((x: any) =>
      passenger.ageGroup == INFANT_ID
        ? x.ageGroup == INFANT_ID
        : passenger.services?.find((y: any) => y.id == x.hotelService?.id ?? 0) && x.formulated
    )
    .reduce((sum: any, x: any) => (sum += x.price), 0);
  const price =
    passenger.ageGroup == INFANT_ID
      ? servicePrice
      : basePrice + servicePrice + getPackageRoomPrice(passenger.roomReservations[0]?.roomType,packageService);
  return price;
};

export { calculatePassengerPrice };

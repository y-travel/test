interface IFacility {
	name: string;
	iconName: string;
	info: string;
}
interface IHotelFacility {
	facility: IFacility;
	isImportant: boolean;
	isEnable: boolean;
}
interface IRoomFacility extends IHotelFacility {}

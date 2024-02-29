import { reactive } from 'vue';

import { loc } from 'src/boot/i18n';

const store = reactive({
	loading: {} as any,
	step: 1,
	reserve: {} as any,
	hotel: {} as any,
	registerer: { person: {}, buyerType: <TBuyerType>'person' } as any,
	isHeadEqualReservator: false,
	hasForeignGuest: false,
	isAcceptedRules: false,
	//////////////////////////////////////////////////////////////////////////////////////////////
	gotoDataEntryStep() {
		this.step = 1;
	},
	async gotoPaymentPage() {
		if (
			await Service.hotel.hotelReservationUpsert(this.reserve.id, {
				...this.reserve,
				buyer: this.registerer,
				services: [
					{ ...this.reserve.services[0], recipient: this.isHeadEqualReservator ? this.registerer.person.id : this.reserve.services[0].recipient },
				],
			})
		) {
			this.step = 2; //go to payment step,TODO: make it clean by changing step var
		}
	},
	gotoVoucherStep() {
		this.step = 3;
	},
	async getData(hotelId: string, reservationId: string, token: string) {
		const res = Utils.auth.isAuthenticated()
			? await Service.hotel.getHotelReservation(reservationId, 'buyer.person')
			: await Service.hotel.getTemporaryHotelReservation(token, 'buyer.person');

		if (!res) {
			return 1;
		}

		//add recipient to empty room to prevent error
		for (const roomReserve of res.services) {
			roomReserve.recipient = roomReserve.recipient ?? {};
		}
		this.reserve = { ...this.reserve, ...res };

		this.hotel = await Service.hotel.getHotel(hotelId);

		this.registerer = this.reserve.buyer ?? this.registerer;
		return 0;
	},
	getForeignCountryClass(getList: boolean) {
		const first = { label: loc('cms.withForeignGuest'), value: true, class: this.hasForeignGuest ? 'bg-red-2' : '' };
		const last = { label: loc('cms.withoutForeignGuest'), value: false, class: !this.hasForeignGuest ? 'bg-red-2' : '' };
		return getList ? [first, last] : this.hasForeignGuest ? first : last;
	},
});

export { store };

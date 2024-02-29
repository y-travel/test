<template lang="pug">
q-card.q-pa-xs.row.drop-target(@dragover.prevent,@dragenter.prevent,@drop="!currentRoom.isCompleted?onDrop($event,indexKey):undefined")
	q-card-section.q-gutter-xs.col.q-pa-none()
		q-card-section.row.q-gutter-xs.col-12(:horizontal="$q.screen.gt.sm")
			.col-xs-12.col-sm-3.col-lg-2
				.row.q-gutter-sm
					.column.q-gutter-xs(v-if="upsertPassenger||canChangeRoom")
						q-btn.float-left(v-if="canChangeRoom",size="sm",round, dense,:loading="loading.deleteRoomReserve",  text-color="red",icon="la la-trash",@click="deleteRoomReserve(currentRoom)")
							q-tooltip {{$t('delete')}}
						q-btn.float-left(v-if="hasFinalRegister",size="sm",round, dense,text-color="green",icon="la la-check-double",@click="upsertRoom(true)")
							q-tooltip {{$t('finalRegister')}}
						q-btn.float-left(v-if="upsertPassenger&&canChangePassenger",size="sm",round, dense,text-color="orange", :disable="isCapacityFull",icon="la la-user-plus",@click="upsertPassenger(null,(passenger)=>addPassenger(passenger))")
							q-tooltip {{$t('passengerAdd')}}
					div(v-else)
						q-icon.float-left(size="sm",color="green",name="la la-check")
					.col
						q-select(ref="selectRef",v-model="currentRoom.roomType",dense,:label="$t('roomType')",:disable="!canChangeRoom",:options="roomTypes",:option-value="(opt: any) => opt?.id ?? opt"
							,:option-label="(opt)=>$t(roomTypeLabel(opt))",:error="!!currentRoom.validation",transition-show="flip-up",transition-hide="flip-down",@update:model-value="(value)=>changeSelect(value)")

						span(v-if="getPackageRoomPrice(currentRoom.roomType)") {{`${$t('priceForEachOne')} ${currencyFormat(getPackageRoomPrice(currentRoom.roomType))} ${$t('$')}`}}
			.col-xs-12.col-sm-9.col-lg-10
				.row.justify-end(v-if="currentRoom.packageReservation&&showReservationInfo")
					.col-auto
						| {{`${$t('agency')} : ${currentRoom.packageReservation?.agency?.name??'--'}  , `}}
						| {{`${$t('reservationCode')} : ${currentRoom.packageReservation?.code??'--'}`}}
				.row.truncate-chip-labels
					q-passenger-label(v-for="(passenger,index) in currentRoom.passengers",@dragstart="onDragRoomStart($event,passenger.id,indexKey)",:draggable="canChangeRoom",
						:passenger="passenger",:removable="canChangePassenger",icon-remove="la la-times-circle",@remove="deletePassengerLocally(passenger)"
						,@click="()=>canChangePassenger&&upsertPassenger?upsertPassenger(passenger):undefined",:loadingIcon="loading.upsertPassenger||loading.deletePassenger")
			q-tooltip.bg-red(:model-value="true",v-if="currentRoom.validation") {{$t(currentRoom.validation)}}
</template>
<style scoped>
.q-btn.disabled {
	color: lightgrey !important;
}
</style>
<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, onMounted, onUpdated, ref } from 'vue';

import { getPackageRoomPrice, packageRoomDelete, packageRoomUpsert, requestUpsert } from 'services';
import { loc } from 'src/boot/i18n';
import { currencyFormat, validationRoom } from 'utils';
import QPassengerLabel from './QPassengerLabel.vue';

export default defineComponent({
	name: 'QRoom',
	components: { QPassengerLabel },
	props: {
		rooms: [] as any,
		pkg: Object,
		pkgReservation: Object,
		hotelReservation: Object,
		currentRoom: Object,
		indexKey: Number,
		passengers: [] as any,
		onRefresh: Function,
		hasFinalRegister: Boolean,
		canChangeRoom: Boolean,
		showReservationInfo: Boolean,
		//
		canChangePassenger: Boolean,
		upsertPassenger: Function,
		roomPrices: Array,
	},
	methods: {
		onDragRoomStart: (e: any, passengerId: number, roomIndex: number) => {
			e.dataTransfer.dropEffect = 'move';
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('passengerId', passengerId);
			e.dataTransfer.setData('roomIndex', roomIndex);
		},
	},
	setup(props: any) {
		const $q = useQuasar();
		const loading = ref({} as any);
		const roomTypes = ref([] as any);
		const sharingRoom = { price: 0, name: 'sharing', maxCapacity: 9 };
		const selectRef = ref({});
		let oldSelectedRoomType = undefined as any;
		//
		const init = async (refresh = false) => {
			refresh && props.onRefresh ? await props.onRefresh() : undefined;
			setDefaultRoom();
			if (props.canChangeRoom) {
				roomTypes.value =
					props.pkg.packageService.filter((x: any) => x.roomType && x.isSelectable).map((x: any) => ({ price: x.price, ...x.roomType })) ?? [];
				roomTypes.value.unshift(sharingRoom);
			}
			oldSelectedRoomType = props.currentRoom.roomType;
			props.currentRoom.validation = validationRoom(props.currentRoom)?.message;
		};
		//
		onMounted(async () => await init());
		//
		onUpdated(() => {
			setDefaultRoom();
			props.currentRoom.validation = validationRoom(props.currentRoom)?.message;
		});
		//
		const setDefaultRoom = () => (props.currentRoom.roomType = props.currentRoom.roomType ?? sharingRoom);
		//
		const deleteRoomReserve = async (room: any) => {
			loading.value.deleteRoomReserve = true;
			$q.dialog({
				message: loc('doYouAgreeToRemove'),
				ok: { label: loc('delete'), color: 'negative', flat: true },
				cancel: true,
				focus: 'cancel',
			}).onOk(async () => {
				if ((await packageRoomDelete(props.pkg.id, room.id)).data) {
					await init(true);
				}
			});
			loading.value.deleteRoomReserve = false;
		};
		//
		const addPassenger = async (passenger: any) => {
			loading.value.upsertPassenger = true;
			if (
				(await requestUpsert(`passengers/:id/add-room/${props.currentRoom?.watcherCode}`, passenger.id, {}, { defaultNotify: { notify: false } }))
					.data
			) {
				await refreshData();
			}
			loading.value.upsertPassenger = false;
		};
		//
		const deletePassengerLocally = async (passenger: any) => {
			loading.value.deletePassenger = true;
			if (
				(await requestUpsert(`passengers/:id/remove-room/${props.currentRoom?.watcherCode}`, passenger.id, {}, { defaultNotify: { notify: false } }))
					.data
			) {
				await refreshData();
			}
			loading.value.deletePassenger = false;
			//   $q.dialog({
			//     message: loc('msg.doYouAgreeToRemovePassengerFromThisRoom'),
			//     ok: { label: loc('delete'), color: 'negative', flat: true },
			//     cancel: true,
			//     focus: 'cancel',
			//   }).onOk(async () => {

			//   });
		};
		//
		const upsertRoom = async (isCompleted = false) => {
			const validation = validationRoom(props.currentRoom)?.message;
			if (validation) {
				$q.notify({
					message: loc(validation as any),
					type: 'warning',
				});
				return false;
			}
			loading.value.upsertRoom = true;
			const { data } = await packageRoomUpsert(props.pkg?.id, props.currentRoom.id, {
				pkg: props.pkg.id,
				packageReservation: props.pkgReservation?.id,
				isCompleted: isCompleted,
				roomType:
					typeof props.currentRoom.roomType == 'object'
						? props.currentRoom.roomType.id ?? null //used for clear roomtype
						: props.currentRoom.roomType ?? null,
				passengers: props.currentRoom.passengers.map((y: any) => y.id), //@TODO clean ugly,we have to send them, cos filtered passengers by group to be removed
			});
			if (data) {
				props.currentRoom.dirty = false;
				props.currentRoom.isCompleted = data.isCompleted;
				await refreshData();
				return true;
			}
			loading.value.upsertRoom = false;
		};
		//
		const refreshData = async () => {
			if (getDirtyRooms()?.length) {
				$q.dialog({
					message: loc('msg.youHaveUnsavedRoomDoYouAgreeToRefreshData'),
					ok: { label: loc('submit'), color: 'green', flat: true },
					cancel: true,
					focus: 'cancel',
				}).onOk(async () => {
					await init(true);
				});
			} else {
				await init(true);
			}
		};
		//
		const onDrop = async (e: any, newRoomIndex: number) => {
			const sourceRoomIndex = e.dataTransfer.getData('roomIndex');
			const list = sourceRoomIndex == -1 ? props.passengers : props.rooms[sourceRoomIndex]?.passengers;
			const passenger = list.find((x: any) => x.id == e.dataTransfer.getData('passengerId'));
			await addPassenger(passenger);
		};
		//
		const getDirtyRooms = () => props.rooms.filter((x: any) => x.dirty);

		//************** */
		return {
			deleteRoomReserve,
			addPassenger,
			deletePassengerLocally,
			upsertRoom,
			loading,
			roomTypes,
			currencyFormat,
			onDrop,
			selectRef,
			changeSelect: async (value: any) => {
				// debugger;
				if (!(await upsertRoom())) {
					props.currentRoom.roomType = oldSelectedRoomType;
				}
			},
			isCapacityFull: () => (validationRoom(props.currentRoom)?.val ?? 0) > 0,
			getCurrentPassengers: () => props.currentRoom.passengers,
			roomTypeLabel: (opt: any) => opt?.name ?? (opt ? roomTypes.value.find((x: any) => x.id == opt)?.name : 'ooo'),
			canRoomEdit: (checkPassenger = false) =>
				((props.currentRoom.passengers?.length ?? 0) > 0 || !checkPassenger) && props.currentRoom.dirty && props.currentRoom.roomType,
			getPackageRoomPrice: (roomType: any) =>
				props.roomPrices ? 0 : getPackageRoomPrice(roomType, props.pkg.packageService) + props.pkgReservation?.totalReservationPrice,

			//   onDragRoomStart,
		};
	},
});
</script>

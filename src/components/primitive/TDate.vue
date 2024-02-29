<template lang="pug">
q-input(v-if="!rangeMode&&!btnStyle",ref="inputRef", filled,dense,:clearable="clearable", mask="date",:readonly="!!noneEditable", v-bind="$attrs",v-model="value")
	q-badge(v-if="showGroupAge && isInfant()",color="red",floating ) {{$t('insertAsInfant')}}
	q-badge(v-if="showGroupAge && isBaby()",color="blue",floating ) {{$t('insertAsBaby')}}
	template(v-slot:append)
		q-icon.cursor-pointer(name="la la-calendar-week")
			q-popup-proxy(ref="qDateProxy", cover, transition-show="scale", transition-hide="scale")
				q-date(v-bind="$attrs",v-model="value", calendar="persian",today-btn,@update:modelValue="(value)=>{$refs.qDateProxy.hide();updateValue(value);}",:options="dateValidate")
		div(v-if="displayNavigation")
			q-icon.cursor-pointer(name="la la-arrow-circle-right",@click="onPrevDay()")
				q-tooltip {{$t('prevDay')}}
			q-icon.cursor-pointer(name="la la-arrow-circle-left",@click="onNextDay()" )
				q-tooltip {{$t('nextDay')}}	
q-field(v-else-if="!btnStyle",filled,dense, :label="$t('searchDate')",:prefix="value?.from",:suffix="value?.to",v-bind="$attrs",v-model="value")
		template(v-slot:append)
			q-icon.cursor-pointer(name="la la-calendar-week")
				q-popup-proxy(ref="qDateProxy", cover, transition-show="scale", transition-hide="scale")
					q-date(v-bind="$attrs",v-model="value", calendar="persian",range, today-btn, :options="dateValidate",
						@update:modelValue="(value)=>{if(value?.from&&value?.to){$refs.qDateProxy.hide();updateValue(value);}}")
div(v-else)
	q-popup-proxy(ref="qDateProxy",cover,transition-show="scale",transition-hide="scale")
		q-date(v-bind="$attrs",v-model="value",calendar="persian",range,today-btn,:options="dateValidate",
			@update:modelValue="(value)=>{if(value?.from&&value?.to){$refs.qDateProxy.hide();updateValue(value);}}")
</template>
<script lang="ts">
//@TODO clean,we used $attrs in multiple place cos we got error
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue';

import {
	addToDate,
	checkBabyInDate,
	checkInfantInDate,
	getNow,
	isValidDate,
	isValidDateRange,
	miladiToShamsi,
	shamsiToMiladi,
	dateRangeToShamsi,
	dateRangeToMiladi,
	getIso,
	convertToIsoDateRange,
} from 'src/utils';

export default defineComponent({
	props: {
		rangeMode: Boolean,
		btnStyle: Boolean,
		utcValue: Boolean,
		modelValue: String,
		showGroupAge: Boolean,
		hideFuture: Boolean,
		hidePast: Boolean,
		baseDate: String,
		readonlyDate: Boolean,
		clearable: Boolean,
		noneEditable: Boolean,
		displayNavigation: Boolean,
		dateValidateFunc: Function,
		onValueUpdate: Function,
		changeDateFormat: Boolean, //@TODO future removed, used for backward compatible
	},
	emits: ['utc-value-update'],
	methods: {
		show() {
			(this as any).qDateProxy.show();
		},
	},
	setup(props: any, context) {
		const value = ref();
		const inputRef = ref();
		watch(
			() => props.modelValue,
			(x) => {
				console.log('model', x);
				setValue(props.changeDateFormat ? (x ? Utils.date.dateTypeToDateRange(x) : x) : x);
			}
		);
		//
		watch(value, (x, old) => {
			//to prevent loop when modelValue updated inside of called event
			if ((!props.rangeMode && x == old) || (props.rangeMode && x?.from == old?.from && x?.to == old?.to)) {
				return;
			}
			console.log('....', x, old);
			context.emit('utc-value-update', getStandardValue(x), true);
		});
		//
		const getStandardValue = (dateVal: any) =>
			props.utcValue
				? isValidDate(dateVal)
					? getIso(shamsiToMiladi(dateVal))
					: isValidDateRange(dateVal)
					? props.changeDateFormat
						? Utils.date.dateRangeToDateType(convertToIsoDateRange(dateRangeToMiladi(dateVal)))
						: convertToIsoDateRange(dateRangeToMiladi(dateVal))
					: dateVal
				: Utils.date.isValidDateRangeEx(dateVal)
				? convertToIsoDateRange(dateRangeToMiladi(dateVal))
				: dateVal;

		//
		const updateValue = (strDate: string) => {
			value.value = strDate;
			if (props.onValueUpdate) {
				props.onValueUpdate(getStandardValue(strDate));
			}
		};
		//
		const dateValidate = (srcDate: any) =>
			props.dateValidateFunc
				? props.dateValidateFunc(srcDate)
				: props.hideFuture
				? srcDate <= getNow(false, true)
				: props.hidePast
				? srcDate >= getNow(false, true)
				: true;
		//
		const addToValue = (diff: number) => {
			const tmpValue = miladiToShamsi(addToDate(shamsiToMiladi(value.value), diff));
			if (dateValidate(tmpValue)) {
				updateValue(tmpValue);
			}
		};
		const setValue = (strDate: any) => {
			value.value = (
				props.utcValue ? (isValidDate(strDate) ? miladiToShamsi(strDate) : isValidDateRange(strDate) ? dateRangeToShamsi(strDate) : strDate) : strDate
			) as string;
		};
		//
		onMounted(() => setValue(getCurrentInstance()?.props.modelValue as string));
		//
		return {
			value,
			inputRef,
			checkBabyInDate,
			checkInfantInDate,
			updateValue,
			dateValidate,
			qDateProxy: ref(),
			isInfant: () => checkInfantInDate(shamsiToMiladi(value.value, true), props.baseDate),
			isBaby: () => checkBabyInDate(shamsiToMiladi(value.value, true), props.baseDate),
			onNextDay: () => addToValue(1),
			onPrevDay: () => addToValue(-1),
		};
	},
});
</script>

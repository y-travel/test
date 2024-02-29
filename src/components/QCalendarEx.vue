<template lang="pug">
q-btn.float-left(flat,round,dense,icon="la la-chevron-right",@click="$refs.calendar.prev()")
q-btn.float-left(flat,dense,:label="$t('today')",@click="onToday",color="primary")
q-btn.float-left(flat,round,dense,icon="la la-chevron-left",@click="$refs.calendar.next()")
q-calendar-scheduler(ref="calendar" ,:loading="true",@move="onMove",@change="onChange", view="week", v-model="currentDate",:now="nowDate",v-model:model-resources="resources",
	resource-key="id",resource-label="name",animated,bordered,locale="fa-IR",:weekdays="[6,0,1,2,3,4,5]")
	template(#resource-days="{ scope }")
		template(v-for="(event, index) in getEvents(scope)", :key="index")
			q-badge(outline,class="event-badge", color="primary",@click="()=>onEventClick(event)", :label="event.title",:style="getStyle(event)")
	template(#resource-label="{ scope:{resource}}")
		.row.col
			.row
				q-chip(:clickable="false",:ripple="false")
					q-avatar(color="orange",icon="la la-bed",@click="()=>onResourceClick(resource)")
						q-tooltip {{$t('roomReservation')}}
					span {{resource.name}}
	template(#head-resources="{scope}")
		.row.col.items-center
				.col.text-center.text-orange {{header}}
</template>
<style lang="sass" scoped>
.event-badge
	cursor:	pointer
	position: absolute
.q-avatar
	cursor: pointer
</style>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QCalendarScheduler, today } from '@quasar/quasar-ui-qcalendar';

import QToolbar from './QToolbar.vue';

import { addToDate } from 'src/utils';

export default defineComponent({
	name: 'QCalendarEx',
	components: { QCalendarScheduler, QToolbar },
	emits: ['update:model-value'],
	props: {
		events: Array,
		resources: Array,
		updateEvent: Function,
		selectedDate: String,
		onEventClick: Function,
		onResourceClick: Function,
		header: String,
		headerItems: Array,
	},
	setup(props: any) {
		const currentDate = ref(props.selectedDate);
		const headerItems = [
			{
				name: 'reserve',
				icon: 'la la-plus',
				color: 'orange',
			},
		];
		function getLeft(scope: any, event: any) {
			const left = event.dow * parseFloat(scope.cellWidth);
			const val = left + (scope.cellWidth.endsWith('%') ? '%' : 'px');
			return val;
		}

		function getWidth(scope: any, event: any) {
			const width = (event.range ? event.range : 1) * parseFloat(scope.cellWidth);
			const val = width + (scope.cellWidth.endsWith('%') ? '%' : 'px');
			return val;
		}

		return {
			resourceWidth: 100,
			resourceHeight: 70,
			resourceMinHeight: 20,
			currentDate,
			nowDate: today(),
			addToDate,
			headerItems,
			onChange: (data: any) => {
				props.selectedDate = currentDate.value;
				props.updateEvent(currentDate.value);
			},
			onToday: () => (currentDate.value = today()),
			getEvents: (scope: any) => {
				const res = [] as any;
				if (props.events[scope.resource.id]) {
					// get events for the specified resource
					const resourceEvents = props.events[scope.resource.id];
					// make sure we have events
					if (resourceEvents && resourceEvents.length > 0) {
						// for each event figure out start position and width
						for (let x = 0; x < resourceEvents.length; ++x) {
							res.push({
								id: resourceEvents[x].id,
								left: getLeft(scope, resourceEvents[x]),
								width: getWidth(scope, resourceEvents[x]),
								title: `${resourceEvents[x].title}:${resourceEvents[x].date}:${resourceEvents[x].range}`,
							});
						}
					}
				}
				return res;
			},
			getStyle(event: any) {
				return event
					? {
							background: event.status ?? 'white',
							right: event.left, //@TODO right=rtl,left = ltr
							width: event.width,
					  }
					: {};
			},
		};
	},
});
</script>

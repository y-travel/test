<template lang="pug">
q-layout(view="hhh LpR fFf")
	q-header.bg-primary.text-white(reveal, elevated)
		q-toolbar
			q-btn(dense, flat, round, icon="las la-bars", @click="toggleRightDrawer")
			q-toolbar-title
				q-avatar
				| {{`${$t('_appName')}  - `}}
				| {{ `${$t('dollarCurrentPrice')} : ${$f.currencyFormat(convertDollar(1),'IRR')}` }}
			q-btn(dens,flat,no-wrap,v-show="menuList('user').length>0" )
				q-icon.self-end(name="la la-chevron-down", size="16px")
				q-avatar
					img(src="~assets/avatar.png")
				q-menu(auto-close)
					q-list(dense)
						template(v-for="(menuItem, index) in menuList('user')", :key="index")
							q-separator(:key="'sep' + index", v-if="menuItem.separator")
							q-item(v-show="menuItem.canShow?menuItem.canShow():true",clickable,:active="menuItem.label === 'sample'",:to='{name:menuItem.link}', v-ripple,@click="()=>(menuItem.onClick?menuItem.onClick($q):()=>{})")
								q-item-section(avatar)
									q-icon(size="sm",color="grey",:name="menuItem.icon")
								q-item-section.text-center.text-black {{$t(menuItem.label) }}
	q-drawer(v-model="drawer", show-if-above, side="left", :width="200",:mini="miniState", bordered,class="bg-grey-3" )
			q-list
				template(v-for="(menuItem, index) in menuList('sidebar')", :key="index")
					q-separator(:key="'sep' + index", v-if="menuItem.separator")
					q-item(v-if="!menuItem.children&&canShow(menuItem)",clickable,:to='{name:menuItem.link}',@click="()=>{drawerClick(menuItem);menuItem.onClick?menuItem.onClick():()=>{}}", v-ripple)
						q-item-section(avatar)
							q-icon(size="md",:color="isCurrentRoute(menuItem)?'blue':'grey'",:name="menuItem.icon")
						q-item-section(:class="isCurrentRoute(menuItem)?'text-blue':'text-black'") {{$t(menuItem.label) }}
						q-tooltip(v-if="miniState", transition-show="flip-right",transition-hide="flip-left") {{$t(menuItem.label)}}
					q-expansion-item(v-if="menuItem.children&&canShow(menuItem)",v-model="menuItem.isOpen",:default-opened="isCurrentRoute(menuItem)",:icon="menuItem.icon",:label="menuItem.label")
						template(v-slot:header="props")
							q-item-section(avatar)
								q-icon(size="md",:color="isCurrentRoute(menuItem)?'blue':'black'",:name="menuItem.icon")
							q-item-section(:class="isCurrentRoute(menuItem)?'text-blue':'text-black'") {{$t(menuItem.label) }}
							q-tooltip(v-if="miniState", transition-show="flip-right",transition-hide="flip-left") {{$t(menuItem.label)}}
						q-list
							template(v-for="(subMenuItem, subIndex) in menuItem.children", :key="subIndex")
								q-item(v-if="canShow(subMenuItem)" clickable,:to='{name:subMenuItem.link}',@click="()=>{drawerClick(subMenuItem,false);subMenuItem.onClick?subMenuItem.onClick():()=>{}}", v-ripple)
									q-item-section(avatar)
										q-icon(size="md",:color="isCurrentRoute(subMenuItem)?'blue':'grey'",:name="subMenuItem.icon")
									q-item-section(:class="isCurrentRoute(subMenuItem)?'text-blue':'text-black'") {{$t(subMenuItem.label) }}
									q-tooltip(v-if="miniState", transition-show="flip-right",transition-hide="flip-left") {{$t(subMenuItem.label)}}
	q-page-container
		q-page(padding)
			router-view
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onBeforeMount } from 'vue';

import ChangePassword from 'pages/admin/user/ChangePassword.vue';
import { isAuthenticated, removeAuthentication, isSuperAgency, isAgency, changeLayoutDirection } from 'utils';
import { useRouter } from 'vue-router';

const userList = [
	{
		icon: 'las la-file-invoice-dollar',
		label: 'billPayment',
		link: 'Admin.GeneralLedger',
		canShow: () => isAuthenticated(),
	},
	{
		icon: 'la la-unlock-alt',
		label: 'changePassword',
		link: undefined,
		separator: true,
		canShow: () => isAuthenticated(),
		onClick: ($q: any) => {
			$q.dialog({
				component: ChangePassword,
			});
		},
	},
	{
		icon: 'la la-sign-out',
		label: 'signOut',
		link: '/',
		separator: true,
		canShow: () => isAuthenticated(),
		onClick: () => {
			removeAuthentication();
			window.location.reload();
		},
	},
];
const sidebarList = [
	{
		icon: 'la la-tachometer-alt',
		label: 'dashboard',
		link: 'Admin.Dashboard',
		canShow: () => isSuperAgency(),
	},
	{
		icon: 'la la-cubes',
		label: 'packages',
		link: 'Admin.PackageList',
	},
	{
		icon: 'las la-hotel',
		label: 'hotelReservations',
		link: 'Admin.HotelReservationList',
		canShow: () => isAgency(),
	},
	{
		icon: 'las la-building',
		label: 'agency',
		children: [
			{
				icon: 'la la-user-friends',
				label: 'passengers',
				link: 'Admin.PassengerList',
				canShow: () => isSuperAgency(),
			},
			{
				icon: 'la la-user-friends',
				label: 'agencies',
				link: 'Admin.AgencyList',
				canShow: () => isSuperAgency(),
			},
		],
	},
	{
		icon: 'las la-hotel',
		label: 'hotelier',
		canShow: () => isSuperAgency(),
		children: [
			{
				icon: 'las la-hotel',
				label: 'hotels',
				link: 'Admin.Hotels',
				canShow: () => isSuperAgency(),
			},
			{
				icon: 'las la-hotel',
				label: 'hotelReservations',
				link: 'Admin.HotelReservationList',
				canShow: () => isSuperAgency(),
			},
			{
				icon: 'las la-hotel',
				label: 'hotelierDashboard',
				link: 'Admin.Hotelier',
				canShow: () => isSuperAgency(),
			},
			{
				icon: 'las la-bed',
				label: 'roomReservation',
				link: 'Admin.HotelierScheduler',
				canShow: () => isSuperAgency(),
			},
		],
	},
	{
		icon: 'las la-cash-register',
		label: 'accounting',
		canShow: () => isSuperAgency(),
		children: [
			{
				icon: 'las la-file-invoice-dollar',
				label: 'reservationAudit',
				link: 'Admin.ReservationAudit',
				canShow: () => isSuperAgency(),
			},
			{
				children: [],
				icon: 'las la-file-invoice-dollar',
				label: 'generalLedger',
				link: 'Admin.GeneralLedger',
				canShow: () => isSuperAgency(),
			},
		],
	},
	{
		icon: 'las la-chart-line',
		label: 'report',
		canShow: () => isSuperAgency(),
		children: [
			{
				icon: 'la la-chart-bar',
				label: 'hotelReport',
				link: 'Admin.Report',
				canShow: () => isSuperAgency(),
			},
		],
	},
	{
		...userList.find((x) => x.label == 'signOut'),
	},
	{
		icon: 'la la-sign-in',
		label: 'signIn',
		link: 'Cms.Home',
		separator: true,
		canShow: () => !isAuthenticated(),
	},
];

export default defineComponent({
	setup() {
		console.log('start from hear');
		const menuList = ref({ sidebar: sidebarList, user: userList } as any);
		const miniState = ref(false);
		const drawer = ref(false);
		const router = useRouter();
		const dollar = ref(0); //TODO: should be set a good name
		//
		const init = async () => {
			dollar.value = await Utils.helper.convertCurrency(1);
		};
		//
		const currentRouteName = () => router.currentRoute.value.name;
		//
		const isCurrentRoute = (item: any, routeName = currentRouteName()) =>
			item.link == routeName || item.children?.find((x: any) => x.link == routeName);
		//
		const resetMenuItems = (currentItem: any) => menuList.value.sidebar.forEach((x: any) => (x.isOpen = !!isCurrentRoute(x, currentItem.link)));
		//
		onBeforeMount(() => changeLayoutDirection('rtl'));
		//
		onMounted(async () => await init());
		//
		return {
			drawer,
			menuList: (type: any) => menuList.value[type].filter((x: any) => (x.canShow ? x.canShow() : true)),
			miniState,
			isCurrentRoute,
			convertDollar: (val: number) => val * dollar.value,
			toggleRightDrawer() {
				drawer.value = true;
				miniState.value = !miniState.value;
			},
			canShow: (item: any) =>
				item.canShow ? item.canShow() : (item.children?.filter((x: any) => (x.canShow ? x.canShow() : true))?.length ?? true) > 0,
			isAuthenticated: () => {
				isAuthenticated();
				window.location.reload();
			},
			drawerClick(menuItem: any, toggle: boolean) {
				if (toggle) {
					miniState.value = !menuItem.children;
				}
				resetMenuItems(menuItem);
				console.log(menuList.value);
			},
		};
	},
});
</script>

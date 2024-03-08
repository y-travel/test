import queryString from 'querystring';
import { RouteRecordRaw } from 'vue-router';

import { isAuthenticated, isSuperAgency } from 'utils';
import HomeLayout from 'layouts/HomeLayout.vue';
import SimpleLayout from '../layouts/SimpleLayout.vue';

const resolveAuthenticatedPath = (to: any, from: any) => {
	return isAuthenticated()
		? true
		: {
				name: 'Cms.Home',
				query: { to: to.path, query: queryString.stringify(to.query) },
		  };
};

const routes: RouteRecordRaw[] = [
	{
		name: 'Cms',
		path: '/',
		meta: { layout: HomeLayout },
		component: () => import('layouts/CmsLayout.vue'),
		children: [
			{
				name: 'Cms.Home',
				path: '', //@TODO change it when layout completed
				props: true,
				component: () => import('pages/CMS/home/Index.vue'),
			},
			{
				name: 'Cms.Blog',
				path: 'blog',
				props: true,
				component: () => import('pages/CMS/article/Index.vue'),
			},
			{
				name: 'Cms.Hotel',
				path: 'hotels',
				props: true,
				redirect: { name: 'Cms.Hotel.Index' },
				component: () => import('pages/CMS/hotel/Index.vue'),
				children: [
					{
						name: 'Cms.Hotel.Index',
						path: '',
						component: () => import('pages/CMS/hotel-List/Index.vue'),
					},
					{
						name: 'Cms.Hotel.Details',
						path: ':id/details',
						props: true,
						component: () => import('pages/CMS/hotel-details/Index.vue'),
					},

					{
						name: 'Cms.Hotel.Reserve',
						path: ':hotelId/reserve/:id',
						meta: { layout: SimpleLayout },
						props: true,
						component: () => import('pages/CMS/hotel-reserve/Index.vue'),
					},
				],
			},
			{
				name: 'Cms.Tours',
				path: 'tours',
				props: true,
				redirect: { name: 'Cms.Tours.Index' },
				component: () => import('pages/CMS/tour/Index.vue'),
				children: [
					{
						name: 'Cms.Tours.Index',
						path: '',
						props: true,
						component: () => import('pages/CMS/tour-list/Index.vue'),
					},
					{
						name: 'Cms.Tours.Detail',
						path: ':id/detail',
						props: true,
						component: () => import('pages/CMS/tour-detail/Index.vue'),
					},
				],
			},
			{
				name: 'Cms.AboutUs',
				path: 'about-us',
				props: true,
				component: () => import('pages/CMS/about-us/Index.vue'),
			},
			{
				name: 'Cms.ContactUs',
				path: 'contact-us',
				props: true,
				component: () => import('pages/CMS/contact-us/Index.vue'),
			},
		],
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/Error404.vue'),
	},
];

export default routes;

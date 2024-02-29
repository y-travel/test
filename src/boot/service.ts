import { boot } from 'quasar/wrappers';

//amove all to services index file and refactor other using
import * as pkg from 'services/packageService';
import * as hotel from 'services/hotelService';
import * as room from 'services/roomService';
import * as shared from 'services/sharedService';
import * as agency from 'services/agencyService';
import * as math from 'services/mathService';
import * as img from 'services/imageService';
import * as api from 'services/apiService';
import * as rpt from 'services/reportService';
import * as cms from 'services/cmsService';
import * as user from 'services/userService';
import * as format from 'utils/stringFormat';

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$s: IService;
	}
}
export default boot(({ app }) => {
	//@TODO complete
	app.config.globalProperties.$s = {
		api: api as IApiService,
		pkg: pkg as IPackageService,
		hotel: hotel as IHotelService,
		cms: cms as ICmsService,
		shared: shared,
		agency: agency,
		room: room as IRoomService,
		math: math as IMathService,
		img: img as IImageService,
		report: rpt as IReportService,
		user: user as IUserService,
	} as IService;
	rpt.boot(); //TODO: make it clean
	globalThis.Service = app.config.globalProperties.$s;
	app.provide('service', app.config.globalProperties.$s);
});

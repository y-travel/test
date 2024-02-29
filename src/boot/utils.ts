import { boot } from 'quasar/wrappers';

import * as dateHelper from 'utils/dateHelper';
import * as auth from 'utils/auth';
import * as helper from 'utils/helper';
import * as format from 'utils/stringFormat';

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$u: IUtils;
	}
}
export default boot(({ app }) => {
	//TODO completed definition file for helper and other utility files
	app.config.globalProperties.$u = {
		helper: helper as IHelper,
		date: dateHelper as IDateHelper,
		auth: auth as IAuth,
		format: format as IFormat,
	} as IUtils;
	globalThis.Utils = app.config.globalProperties.$u;
});

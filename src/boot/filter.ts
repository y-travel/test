import { boot } from 'quasar/wrappers';
import { TPackageStatus } from 'services';
import {
	currencyFormat,
	numberFormat,
	timeFormat,
	toLocal,
	validations,
	transferT,
	packageServiceT,
	docType,
	priceType,
} from 'utils';
declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$f: IFilter;
    $rule: IValidationRule;
	}
}

const filters = { currencyFormat, numberFormat, timeFormat, toLocal };
const validationRules = { ...validations };
const enums = { TPackageStatus, transferT, packageServiceT, docType, priceType };

export default boot(({ app }) => {
	app.config.globalProperties.$f = filters as IFilter;
	app.config.globalProperties.$rule = validationRules as IValidationRule;
	app.config.globalProperties.$e = enums;
	app.provide('$g', app.config.globalProperties);
});
export { filters };

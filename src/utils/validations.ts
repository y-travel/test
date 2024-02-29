import { loc } from 'boot/i18n';
import isNaN from 'lodash/isNaN';
import { addToDate, dateDiff, isValid, shamsiToMiladi } from './dateHelper';

const validations = {
	required: [(val: any) => !!val || loc('necessary')],
	nationalCode: [
		(val: any) => !!val || loc('necessary'),
		(val: any) => val.replaceAll(/[^0-9]/g, '').length === 10 || loc('error_length_equal', { equal: '10' } as any),
	],
	passportNo: [
		(val: any) => !!val || loc('necessary'),
		(val: any) => {
			return val.replaceAll('#', '').length >= 9 || loc('error_length_equal', { equal: '10,9' } as any);
		},
	],
	mobileNo: [(val: any) => !val || val.replace('#', '').length === 11 || loc('error_digit_equal', { equal: '11' } as any)],
	NumRequired: [
		(val: any) => {
			const res = !isNaN(val) && Number.isInteger(parseFloat(val));
			console.log(res);
			return res || loc('necessary');
		},
	],
	dateRangeRequired: [(val: any) => (!!val && !!val.from) || loc('necessary')],
	dateMoreThan: (baseDate: string, days: number) => [
		(val: any) => {
			if (!isValid(val)) {
				return false || loc('notValid');
			}
			const res = dateDiff(addToDate(baseDate, days), shamsiToMiladi(val)) > 0;
			return res || loc('msg.passExDateIsLessThanDays');
		},
	],
	date: (local = 'persian') => [
		(val: any) => {
			return isValid(val) || loc('notValid');
		},
	],
	email: [(val: any) => !val || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) || loc('error_email')],
};

export { validations };

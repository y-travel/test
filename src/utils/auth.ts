import { IAxiosRequestConfig } from 'boot/axios';
import { loc } from 'boot/i18n';
import { request, requestGet } from 'services/apiService';
import { strapiErrorLocalization } from 'services/errorService';

const getMe = () => JSON.parse(localStorage.getItem('me') ?? '{}');

const getCurrentAgency = () => getMe()?.agency;

const getCurrentRole = () => getMe()?.role;

const isAuthenticated = () => !!getCurrentToken();

const isSuperAgency = () => getCurrentRole()?.name?.startsWith('superAgency') ?? false;

const isAgency = () => isAuthenticated() && getCurrentRole()?.name?.startsWith('agency');

const login = async (data: ILogin | IVerifyMobile) => {
	const isMobileVerification = !!(data as IVerifyMobile)?.mobileNo;
	const res = (await request({
		method: 'post',
		url: isMobileVerification ? '/api/people/verify' : '/api/auth/local',
		data: isMobileVerification ? { data: data } : data,
		noAuth: true,
	} as IAxiosRequestConfig)) as any;

	if (res.error || !res.jwt) {
		return strapiErrorLocalization(res.error, undefined, [{ item: loc(isMobileVerification ? 'verificationCode' : 'usernameOrPassword') }]);
	}

	resetToken(res.jwt);

	const me = (await requestGet('users/me')) as any;
	if (me.error) {
		removeToken();
		return strapiErrorLocalization(me.error);
	} else {
		localStorage.setItem('me', JSON.stringify(me));
	}
	return '';
};

const resetToken = (token: string) => localStorage.setItem('token', token);

const getCurrentToken = () => localStorage.getItem('token');

const removeToken = () => localStorage.removeItem('token');

const removeAuthentication = () => {
	removeToken();
	localStorage.removeItem('me'); //@TODO clean
};

export {
	getMe,
	login,
	resetToken,
	getCurrentToken,
	getCurrentRole,
	getCurrentAgency,
	isAuthenticated,
	isSuperAgency,
	removeAuthentication,
	isAgency,
};

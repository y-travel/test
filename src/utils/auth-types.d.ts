declare type LoginType = 'userPassword' | 'verifyCode';
interface IAuth {
	getMe(): IUser;

	getCurrentAgency(): any;

	getCurrentRole(): any;

	isAuthenticated(): boolean;

	isSuperAgency(): boolean;

	isAgency(): boolean;

	login(data: ILogin | IVerifyMobile): Promise<string>;

	resetToken(token: string): void;

	getCurrentToken(): string;
}
interface ILogin {
	identifier: string | undefined;
	password: string;
}
interface IVerifyMobile {
	mobileNo: string;
	smsToken: string;
	createIfNotExist: boolean;
	person: any;//TODO: should be set type
}

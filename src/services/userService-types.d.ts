interface IUserService {
	getPerson(): Promise<any>;
}
interface IAgency {}
interface IPerson {
	id: string;
	name: string;
	family: string;
	nameEn: string;
	familyEn: string;
	passportNo: string;
	birthDate: string;
	passportExpDate: string;
	sex: boolean;
	nationalCode: string;
	isLeader: boolean;
	mobileNo: string;
	email: string;
	credit: number;
}

interface IUser {
	id: string;
	confirmed: true;
	blocked: false;
	agency: IAgency;
	person: IPerson;
}

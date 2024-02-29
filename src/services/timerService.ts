//@TODO: should be clean
class CountDownTimer {
	intervalId: any;
	minutes: string | number = '0';
	seconds: string | number = '0';

	constructor(callBackFunc: (duration: number, val: string) => void) {
		this.onValueChanged = callBackFunc;
	}

	onValueChanged: (duration: number, val: string) => void = undefined as any;

	stopTimer = () => clearInterval(this.intervalId);

	startTimer = (duration: number) => {
		this.minutes = this.getMinutes(duration);
		this.seconds = this.getSeconds(duration);
		if (this.onValueChanged) {
			this.onValueChanged(duration, `${this.minutes}:${this.seconds}`);
		}
		this.intervalId = setInterval(() => {
			if (--duration <= 0) {
				clearInterval(this.intervalId);
			}
			this.minutes = this.getMinutes(duration);
			this.seconds = this.getSeconds(duration);
			if (this.onValueChanged) {
				this.onValueChanged(duration, `${this.minutes}:${this.seconds}`);
			}
		}, 1000);
	};

	getMinutes = (timer: number) => {
		let res = parseInt((timer / 60) as any, 10);
		return res < 10 ? '0' + res : res;
	};

	getSeconds = (timer: number) => {
		let res = parseInt((timer % 60) as any, 10);
		return res < 10 ? '0' + res : res;
	};
}
export { CountDownTimer };

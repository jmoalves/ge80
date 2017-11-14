import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
	constructor() { }

	isoDate(date: Date): string {
		let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
		let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().substr(0, 10);
		return localISOTime;
	}
}

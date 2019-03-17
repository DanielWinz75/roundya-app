import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeleft'
})
export class TimeLeftPipe implements PipeTransform {
  transform(expireDate: string) {
    const expires = new Date(expireDate).valueOf();
    const now = new Date().valueOf();
    let minsLeft = (expires - now) / (1000 * 60);
    if (minsLeft >= 60) {
      let hoursLeft = minsLeft / 60;
      hoursLeft = Math.floor(hoursLeft);
      minsLeft = minsLeft % 60;
      minsLeft = Math.floor(minsLeft);
      return hoursLeft + ':' + minsLeft + 'h';
    }
    minsLeft = Math.floor(minsLeft);
    return minsLeft + 'm';
  }
}

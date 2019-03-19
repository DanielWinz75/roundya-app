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
      let minsStr = minsLeft.toString();
      if (minsLeft < 10) {
        minsStr = '0' + minsLeft;
      }
      if (hoursLeft < 10) {
        return '0' + hoursLeft + ':' + minsStr;
      }
      return hoursLeft + ':' + minsStr;
    }

    minsLeft = Math.floor(minsLeft);
    if (minsLeft < 10) {
      return '00:0' + minsLeft;
    }
    return '00:' + minsLeft;
  }
}

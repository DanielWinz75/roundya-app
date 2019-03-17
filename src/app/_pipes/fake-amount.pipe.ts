import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fakeamount'})
export class FakeAmountPipe implements PipeTransform {
  transform(anInput) {
    return Math.floor(Math.random() * 20);
  }
}

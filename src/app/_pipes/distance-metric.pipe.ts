import { Pipe, PipeTransform } from '@angular/core';



@Pipe({name: 'distmetric'})
export class DistMetric implements PipeTransform {
  transform(kilometers: string): string {

    let dist = Number.parseFloat(kilometers);

    if ( dist < 1 ) {
      dist = dist * 1000;
      // let strDist = dist.toPrecision(0);
      // let strDist: string = dist.toString();
      // strDist = strDist.substring(0, 3);

      return dist.toFixed(0) + 'm';
    } else {
      // let strDist = dist.toPrecision(1);
      return dist.toFixed(1) + 'km';
    }


  }

}

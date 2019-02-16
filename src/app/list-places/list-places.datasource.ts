import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { DataSource } from '@angular/cdk/table';
import { map, tap, catchError, finalize } from 'rxjs/operators';
import { BehaviorSubject, of, Subject } from 'rxjs';

import { Place } from '../_models/Place';
import { LoadPlacesService } from '../_services/load-places.service';


export class ListPlacesDatasource extends DataSource<Array<any>> {

  placesSubject: BehaviorSubject<Array<Place>> = new BehaviorSubject([]);

  constructor(private loadPlacesService: LoadPlacesService) {
    super();
  }

  connect(): Observable<any> {
    this.placesSubject.subscribe(places => console.log('places: ', places));
    return this.placesSubject.asObservable();
  }

  getAllPlaces(): void {
    this.loadPlacesService.getAllPlaces$()
      .pipe(
        catchError(() => of([]))
        // finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(places => this.placesSubject.next(places));
  }

  getNearPlaces(coordinates: Array<number>): void {
    this.loadPlacesService.getPlacesByCoordinates$(coordinates)
      .pipe(
        catchError(() => of([]))
        // finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(places => {
        console.log('next places');
        this.placesSubject.next(places);
      });
  }

  showError(error) {}

  disconnect() {}
}



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Place } from '../_models/Place';

@Injectable({ providedIn: 'root' })
export class LoadPlacesService {
  requestorLocation: Place = {
    subject: 'singular',
    predicate: '',
    object: '',
    text: '',
    ownerId: '',
    url: '',
    location: {
      type: 'Point',
      coordinates: [0, 0]
    }
  };

  constructor(private http: HttpClient) {}

  getAllPlaces$(): Observable<Array<Place>> {
    return this.http.get<any>(`${environment.apiUrl}/places`, {
      observe: 'response'
    }).pipe(map(resp => {
      console.log('get all places: ', resp);
      return resp.body;
    }));
  }

  getPlacesByCoordinates$(coordinates: Array<number>): Observable<Array<Place>> {
    this.requestorLocation.location.coordinates[0] = coordinates[0];
    this.requestorLocation.location.coordinates[1] = coordinates[1];
    return this.http.post<any>(`${environment.apiUrl}/places/near`, this.requestorLocation, {
      observe: 'response'
    }).pipe(map(resp => {
      console.log('get places by position: ', resp);
      return resp.body;
    }));
  }

  showError(error) {}

  disconnect() {}
}

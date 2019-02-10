import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Place } from '../_models/Place';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AddPlaceService {
  constructor(private http: HttpClient) {}

  addPlace(place: Place): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/places`, place, {
      observe: 'response'
    });
  }
}

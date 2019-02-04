import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/ApplicationUser';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SignUpService {
  constructor(private http: HttpClient) {}

  signup(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/signup`, user, {
      observe: 'response'
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, first, tap } from 'rxjs/operators';
import { User } from '../_models/ApplicationUser';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject: BehaviorSubject<string>;
  public token: Observable<string>;

  constructor(private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('token'))
    );
    this.token = this.tokenSubject.asObservable();
  }

  public get tokenValue(): string {
    return this.tokenSubject.value;
  }

  public login(username: string, password: string): Observable<void> {
    return this.http
      .post<any>(
        `${environment.apiUrl}/login`,
        { username, password },
        { observe: 'response' }
      )
      .pipe(
        map(resp => {
          // login successful if there's a jwt token in the response

          const jwtToken = resp.headers
            .get('Authorization')
            .replace('Bearer', '')
            .trim();

          if (jwtToken) {
            localStorage.setItem('token', JSON.stringify(jwtToken));

            // TBD: I don't understand this step yet
            this.tokenSubject.next(jwtToken);
          }
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }
}

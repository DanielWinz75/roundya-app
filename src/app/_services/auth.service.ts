import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, first, tap } from 'rxjs/operators';
import { User } from '../_models/ApplicationUser';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
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
            localStorage.setItem('currentUser', JSON.stringify(jwtToken));
          }
          return jwtToken;

          // console.log('User: ', user);
          // if (user && user.token) {
          //   // store user details and jwt token in local storage to keep user logged in between page refreshes
          //   localStorage.setItem('currentUser', JSON.stringify(user));
          //   this.currentUserSubject.next(user);
          // }
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigsStore {
  private predicates$: BehaviorSubject<Array<string>>;
  private domains$: BehaviorSubject<Array<string>>;

  constructor(private http: HttpClient) {
    this.predicates$ = new  BehaviorSubject(undefined);
    this.domains$ = new  BehaviorSubject(undefined);
  }

  getPredicates(): Array<string> {
    return this.predicates$.getValue();
  }

  getPredicates$(): Observable<Array<string>> {
    return this.predicates$.asObservable();
  }

  getDomains(): Array<string> {
    return this.domains$.getValue();
  }

  getDomains$(): Observable<Array<string>> {
    return this.domains$.asObservable();
  }

  init(): void {
    if (this.getPredicates() !== undefined && this.getDomains() !== undefined) {
      return;
    }

    this.http.get(environment.configsUrl)
      .subscribe(resp => {
        this.predicates$.next(resp['predicates']);
        this.domains$.next(resp['domains']);
      });
  }
}

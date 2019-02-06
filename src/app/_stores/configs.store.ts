import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigsStore {
  private predicates$: BehaviorSubject<Array<string>>;
  private subjects$: BehaviorSubject<Array<string>>;

  constructor(private http: HttpClient) {
    this.predicates$ = new  BehaviorSubject(undefined);
    this.subjects$ = new  BehaviorSubject(undefined);
  }

  getPredicates(): Array<string> {
    return this.predicates$.getValue();
  }

  getSubjects(): Array<string> {
    return this.subjects$.getValue();
  }

  getPredicates$(): Observable<Array<string>> {
    return this.predicates$.asObservable();
  }

  getSubjects$(): Observable<Array<string>> {
    return this.subjects$.asObservable();
  }

  init(): void {
    if (this.getPredicates() !== undefined) {
      return;
    }

    this.http.get(environment.configsUrl)
      .subscribe(resp => {
        console.log(resp);
        this.predicates$.next(resp['predicates']);
        this.subjects$.next(resp['subjects']);
      });
  }
}

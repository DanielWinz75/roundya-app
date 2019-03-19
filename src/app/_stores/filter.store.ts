import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterStore {
  private distance$: BehaviorSubject<number>;
  private domain$: BehaviorSubject<string>;

  constructor() {
    this.distance$ = new  BehaviorSubject(0);
    this.domain$ = new  BehaviorSubject(undefined);
  }

  getDistance(): number {
    return this.distance$.getValue();
  }

  getDistance$(): Observable<number> {
    return this.distance$.asObservable();
  }

  setDistance(n: number): void {
    this.distance$.next(n);
  }

  getDomain(): string {
    return this.domain$.getValue();
  }

  getDomain$(): Observable<string> {
    return this.domain$.asObservable();
  }

  setDomain(d: string) {
    this.domain$.next(d);
  }

}

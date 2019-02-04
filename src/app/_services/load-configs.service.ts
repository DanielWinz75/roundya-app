import { OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadConfigsService implements OnInit {
  private predicatesSubject: BehaviorSubject<Array<string>>;
  private subjectsSubject: BehaviorSubject<Array<string>>;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  public get predicates(): Array<string> {
    return this.predicatesSubject.value;
  }

  public get subjects(): Array<string> {
    return this.subjectsSubject.value;
  }

  loadConfigs() {
    console.log('in loadconfigs');

    // TBD: put predicates and subjects into BehaviorSubjects
    this.http.get('http://localhost:8080/configs').subscribe(resp => {
      console.log(resp);
    });
  }
}

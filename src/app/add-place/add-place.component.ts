import { Component, OnInit } from '@angular/core';
import { ConfigsStore } from '../_stores/configs.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {
  model: {
    subject: string;
    predicate: string;
    object: string;
    text: string;
    owner: string;
    location: {
      type: 'Point';
      coordinates: Array<number>;
    };
  };

  singPredicates$: Observable<Array<string>>;
  plurPredicates$: Observable<Array<string>>;

  constructor(private configsStore: ConfigsStore) {}

  ngOnInit() {
    this.singPredicates$ = this.configsStore.getPredicates$()
    .pipe(map(preds => {
      return preds.map(pred => 'predicate.singular.' + pred);
    }));
    this.plurPredicates$ = this.configsStore.getPredicates$()
    .pipe(map(preds => {
      return preds.map(pred => 'predicate.plural.' + pred);
    }));  
  }

  onSubmit() {}

  selectSubjectType() {

  }
}

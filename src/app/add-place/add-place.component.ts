import { Component, OnInit } from '@angular/core';
import { ConfigsStore } from '../_stores/configs.store';
import { Observable } from 'rxjs';

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

  predicates$: Observable<Array<string>>;
  subjects$: Observable<Array<string>>;

  constructor(private configsStore: ConfigsStore) {}

  ngOnInit() {
    this.predicates$ = this.configsStore.getPredicates$();
    this.subjects$ = this.configsStore.getSubjects$();
  }

  onSubmit() {}
}

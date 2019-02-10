import { Component, OnInit } from '@angular/core';
import { ConfigsStore } from '../_stores/configs.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddPlaceService } from '../_services/add-place.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {

  @ViewChild('predicate') predSelector;

  remainingChars = 300;

  model: any = {
    subject: 'singular',
    predicate: '',
    object: '',
    text: '',
    owner: '',
    location: {
      type: 'Point',
      coordinates: [-122.414023, 37.776023]
    }
  };
  error: string;
  loading: boolean;

  predicates$: Observable<Array<string>>;

  constructor(private router: Router, private configsStore: ConfigsStore, private addPlaceService: AddPlaceService) {}

  ngOnInit() {

    navigator.geolocation.getCurrentPosition(position => {
      // this.location = position.coords;
      console.log(position.coords);
    });

    this.predicates$ = this.configsStore.getPredicates$()
    .pipe(map(preds => {
      return preds.map(pred => 'predicate.singular.' + pred);
    }));
  }

  onSubmit() {
    this.addPlaceService.addPlace(this.model).subscribe(
      () => {
        this.model.submitted = true;
        this.router.navigate(['places']);
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  onSelectSubject() {
    this.predicates$ = this.configsStore.getPredicates$()
    .pipe(map(preds => {
      return preds.map(pred => 'predicate.' + this.model.subject + '.' + pred);
    }));
  }

  splitLast(predicate: string): string {
    const splits = predicate.split('.');
    return splits.pop();
  }

  doTextAreaChange(e) {
    this.remainingChars = 300 - e.target.value.length;
  }
}

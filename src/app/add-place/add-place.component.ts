import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ConfigsStore } from '../_stores/configs.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddPlaceService } from '../_services/add-place.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {
  remainingChars = 300;

  duration = '1h';

  model: any = {
    expires : '',
    subject: '',
    predicate: '',
    object: '',
    text: '',
    ownerId: '',
    url: '',
    location: {
      type: 'Point',
      coordinates: [0, 0]
    }
  };
  error: string;
  loading: boolean;

  predicates$: Observable<Array<string>>;

  constructor(
    private router: Router,
    private configsStore: ConfigsStore,
    private addPlaceService: AddPlaceService,
    private datePipe: DatePipe) {

      // set default - initially 1 hour
      const expTimeMillis = new Date().valueOf() + 1000 * 3600;
      this.model.expires = this.datePipe.transform(expTimeMillis, 'yyyy-MM-dd\'T\'HH:mm:ssZ');
    }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.model.location.coordinates[0] = position.coords.latitude;
      this.model.location.coordinates[1] = position.coords.longitude;
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

  pitch(event: any) {
    let duration;

    if (!event.value) {
      return 0;
    }

    const expTimeMillis = new Date().valueOf() + 1000 * 3600 * event.value; // current date + value in millies
    this.model.expires = this.datePipe.transform(expTimeMillis, 'yyyy-MM-dd\'T\'HH:mm:ssZ');

    console.log(this.model.expires);

    if (event.value < 24) {
      duration = event.value + 'h';
    }
    if (event.value >= 24) {
      duration = Math.round(event.value / 24) + 'd';
    }


    this.duration = duration;
  }

}

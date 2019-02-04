import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {}

  onSubmit() {}
}

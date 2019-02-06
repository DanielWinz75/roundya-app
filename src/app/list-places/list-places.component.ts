import { Component, OnInit } from '@angular/core';
import { ConfigsStore } from '../_stores/configs.store';

@Component({
  selector: 'app-list-places',
  templateUrl: './list-places.component.html',
  styleUrls: ['./list-places.component.scss']
})
export class ListPlacesComponent implements OnInit {
  constructor(private configsStore: ConfigsStore) {
    console.log('constructor');
    this.configsStore.init();
  }

  ngOnInit() {}
}

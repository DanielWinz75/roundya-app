import { ConfigsStore } from '../_stores/configs.store';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoadPlacesService } from '../_services/load-places.service';
import { Router } from '@angular/router';
import { ListPlacesDatasource } from './list-places.datasource';

@Component({
  selector: 'app-list-places',
  templateUrl: './list-places.component.html',
  styleUrls: ['./list-places.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class ListPlacesComponent implements OnInit, AfterViewInit {
  displayedColumns = ['favicon', 'whoWantsToDoWhat', 'time', 'dist'];
  dataSource: ListPlacesDatasource;

  logo = 'https://proxy.duckduckgo.com/ip3/www.bmw.de.ico';

  constructor(private configsStore: ConfigsStore, private loadPlacesService: LoadPlacesService, private router: Router) {
    this.configsStore.init();
    this.dataSource = new ListPlacesDatasource(this.loadPlacesService);
    if (!navigator.geolocation) {
      console.log('Browser doesn\'t support geolocation.');
      const coordinates = [0, 0];
      this.setDataSource(coordinates);
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        const coordinates = [position.coords.latitude, position.coords.longitude];
        this.setDataSource(coordinates);
      });
    }
  }

  setDataSource(coordinates: Array<number>): void {
    if (coordinates[0] === 0 && coordinates[1] === 0) {
      this.dataSource.getAllPlaces();
    } else {
      this.dataSource.getNearPlaces(coordinates);
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
  }
}

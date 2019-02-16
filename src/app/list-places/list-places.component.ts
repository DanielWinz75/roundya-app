import { ConfigsStore } from '../_stores/configs.store';
import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoadPlacesService } from '../_services/load-places.service';
import { Router } from '@angular/router';
import { ListPlacesDatasource } from './list-places.datasource';
import { Subject } from 'rxjs';

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
export class ListPlacesComponent {
  displayedColumns = ['whoWantsToDoWhat', 'dist', 'appr'];
  dataSource: ListPlacesDatasource;
  error: string;
  coordinatesSubject: Subject<Array<number>> = new Subject();

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  // expandedElement: any;

  constructor(private configsStore: ConfigsStore, private loadPlacesService: LoadPlacesService, private router: Router) {
    this.configsStore.init();
    navigator.geolocation.getCurrentPosition(position => {
      if (!navigator.geolocation) {
        const error = 'Browser doesn\'t support geolocation.';
        this.coordinatesSubject.next([0, 0]);
      }
      const coordinates = [position.coords.latitude, position.coords.longitude];
      this.coordinatesSubject.next(coordinates);
    });
  }

  ngOnInit() {
    this.coordinatesSubject.subscribe(coordinates => {
      console.log('coordinates: ', coordinates);
      this.dataSource = new ListPlacesDatasource(this.loadPlacesService);
      if (coordinates[0] === 0 && coordinates[1] === 0) {
        this.dataSource.getAllPlaces();
      } else {
        this.dataSource.getNearPlaces(coordinates);
      }
    });
  }

  ngAfterViewInit() {
  }
}

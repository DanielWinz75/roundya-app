import { Component, OnInit } from '@angular/core';
import { LoadConfigsService } from '../_services/load-configs.service';

@Component({
  selector: 'app-list-places',
  templateUrl: './list-places.component.html',
  styleUrls: ['./list-places.component.scss']
})
export class ListPlacesComponent implements OnInit {
  constructor(private loadConfigsService: LoadConfigsService) {}

  ngOnInit() {
    console.log('in list places');
    this.loadConfigsService.loadConfigs();
  }
}

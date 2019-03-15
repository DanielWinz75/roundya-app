import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'filter-places',
    templateUrl: 'filter-places.component.html',
    styleUrls: ['filter-places.component.scss']
})
export class FilterPlacesComponent {
    distance = 0;
    domain = '';
    domains = ['Messe Köln', 'Bonner Innenstadt'];

    constructor(private router: Router) {}

    pitch(event: any) {
        let distance;
        if (!event.value) {
            return 0;
        }
        if (event.value < 1000) {
        distance = event.value + 'm';
        }
        if (event.value >= 1000) {
        distance = Math.round(event.value / 1000) + 'km';
        }
        this.distance = distance;
    }
}

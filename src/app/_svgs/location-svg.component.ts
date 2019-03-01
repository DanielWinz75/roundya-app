import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-location-svg',
    templateUrl: 'location-svg.component.html'
})
export class LocationSvgComponent {

    @Input()
    height: number;
    @Input()
    width: number;
    @Input()
    color: string;
    // @Input()
    // pad_x: number;
    // @Input()
    // pad_y: number;
    // @Input()
    // zoom_height: number;
    // @Input()
    // zoom_width: number;

    constructor() {}
}

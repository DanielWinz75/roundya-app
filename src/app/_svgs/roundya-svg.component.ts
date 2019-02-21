import { Component, Input } from "@angular/core";

@Component({
    selector: 'roundya-svg',
    templateUrl: 'roundya-svg.component.html',
    styleUrls: ['roundya-svg.component.scss']
})
export class RoundyaSvgComponent {

    @Input()
    height: number;
    @Input()
    width: number;;
    @Input()
    pad_x: number;;
    @Input()
    pad_y: number;;
    @Input()
    zoom_height: number;;
    @Input()
    zoom_width: number;;

    constructor() {}

}
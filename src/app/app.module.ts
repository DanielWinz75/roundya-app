import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PipeTransform } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPlacesComponent } from './list-places/list-places.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TheMaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { JwtInterceptor } from './_utils/jwt.interceptor';
import { ErrorInterceptor } from './_utils/error.interceptor';
import { SignUpComponent } from './signup/signup.component';
import { RoundyaSvgComponent } from './_svgs/roundya-svg.component';
import { MustMatchDirective } from './_directives/must-match.directive';
import { AddPlaceComponent } from './add-place/add-place.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HamburgerMenuSvgComponent } from './_svgs/hamburger-menu-svg.component';
import { FilterMenuSvgComponent } from './_svgs/filter-menu-svg.component';
import { CrowdSvgComponent } from './_svgs/crowd-svg.component';
import { LocationSvgComponent } from './_svgs/location-svg.component';
import { GetDuckDuckGoIcoUrl } from './_pipes/get-duckduckgo-ico-url.pipe';
import { ClockSvgComponent } from './_svgs/clock-svg.component';
import { DistMetric } from './_pipes/distance-metric.pipe';
import {DatePipe} from '@angular/common';
import { FilterPlacesComponent } from './filter-places/filter-places.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPlacesComponent,
    LoginComponent,
    SignUpComponent,
    MustMatchDirective,
    AddPlaceComponent,
    RoundyaSvgComponent,
    HamburgerMenuSvgComponent,
    FilterMenuSvgComponent,
    CrowdSvgComponent,
    LocationSvgComponent,
    ClockSvgComponent,
    GetDuckDuckGoIcoUrl,
    DistMetric,
    FilterPlacesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TheMaterialModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

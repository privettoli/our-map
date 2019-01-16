import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {MapComponent} from './components/map/map.component';
import {AgmCoreModule} from "@agm/core";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    })
  ],
  bootstrap: [MapComponent]
})
export class AppModule {
}

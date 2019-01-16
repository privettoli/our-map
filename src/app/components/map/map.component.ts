import {Component} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  latitude: number = environment.googleMapsDefaultSettings.latitude;
  longitude: number = environment.googleMapsDefaultSettings.longitude;
  zoom: number = environment.googleMapsDefaultSettings.zoom;
  mapTypeId = environment.googleMapsDefaultSettings.mapTypeId;
  mapLoaded: boolean = false;
}

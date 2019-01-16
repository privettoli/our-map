import {$, browser} from 'protractor';

export class MapPage {
  navigateTo() {
    return browser.get('/');
  }

  getGoogleMap() {
    return $('.map__google-map');
  }

  getSearchPlaceField() {
    return $('.map__search-place-field');
  }
}

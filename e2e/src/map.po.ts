import {$, browser, ElementFinder} from 'protractor';

export class MapPage {
  navigateTo() {
    return browser.get('/');
  }

  getGoogleMap(): ElementFinder {
    return $('.map__google-map');
  }

  getSearchPlaceField(): ElementFinder {
    return $('.map__search-place-field');
  }

  getPlacesList(): ElementFinder {
    return $('.map__places-list');
  }
}

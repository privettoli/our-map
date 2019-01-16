import {MapPage} from './map.po';
import {browser, ExpectedConditions} from "protractor";

describe('workspace-project App', () => {
  const wait: number = 1_000;
  const page: MapPage = new MapPage();

  describe(`As first user I want that`, () => {
    describe(`when I open the page for the first time unauthenticated the app`, () => {
      it(`should display Google Map`, async () => {
        await page.navigateTo();

        expect(await page.getGoogleMap().isPresent()).toEqual(true, `Don't see Google Maps here`);
      });
      it('should display Search Place field', async () => {
        await browser.wait(ExpectedConditions.presenceOf(page.getSearchPlaceField()), wait,
          `Didn't load search place field`);
      });
    });
  });
});

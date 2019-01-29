import {MapPage} from './map.po';
import {browser, ExpectedConditions, Key} from "protractor";

describe('Map', () => {
  const wait: number = 1_000;
  const page: MapPage = new MapPage();

  describe(`As Anatolii I want that`, () => {
    beforeEach(async () => {
      await page.navigateTo();
    });
    describe(`when I open the page for the first time unauthenticated`, () => {
      it(`should display Google Map`, async () => {
        expect(await page.getGoogleMap().isPresent()).toEqual(true, `Don't see Google Maps here`);
      });
      it(`should display Search Place field`, async () => {
        await browser.wait(ExpectedConditions.presenceOf(page.getSearchPlaceField()), wait,
          `Didn't load search place field`);
      });
      describe('and when I enter name of place', () => {
        beforeEach(async () => {
          await page.getSearchPlaceField().sendKeys('Playa Doña Ana')
        });
        describe(`and when I hit enter`, () => {
          beforeEach(() => {
            page.getSearchPlaceField().sendKeys(Key.ENTER);
          });
          it(`should display the entered name of place in list of places`, async () => {
            expect(await page.getPlacesList().getText()).toContain('Playa Doña Ana');
          });
        })
      });
    });
  });
});

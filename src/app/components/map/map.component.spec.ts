import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapComponent} from './map.component';
import {By} from "@angular/platform-browser";
import {AgmMap} from "@agm/core";
import {Component, EventEmitter, Input, Output} from "@angular/core";

describe(`MapComponent`, () => {
  let fixture: ComponentFixture<MapComponent>;
  let component: MapComponent;
  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      declarations: [
        MapComponent, AgmMock
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
  });
  describe(`Isolation Tests`, () => {
    describe(`addPlace`, () => {
      it(`should add value of input from event to places list`, () => {
        component.addPlace({target: {value: 'Some place far far away'} as HTMLInputElement} as unknown as KeyboardEvent);

        expect(component.places).toEqual(['Some place far far away']);
      });
    })
  });
  describe(`Shallow Tests`, () => {
    it(`should initialize google map with default properties`, () => {
      component.latitude = 10;
      component.longitude = 20;
      component.mapTypeId = 'hybrid';
      component.zoom = 21;

      fixture.detectChanges();

      const agmMap: AgmMap = fixture.debugElement.query(By.css('.map__google-map')).componentInstance;
      expect(agmMap.latitude).toEqual(10);
      expect(agmMap.longitude).toEqual(20);
      expect(agmMap.mapTypeId).toEqual('hybrid');
      expect(agmMap.zoom).toEqual(21);
    });
    describe(`map has been loaded`, () => {
      beforeEach(() => {
        const agmMap: AgmMap = fixture.debugElement.query(By.css('.map__google-map')).componentInstance;

        agmMap.mapReady.emit(new Event('mapReady'));

        fixture.detectChanges();
      });
      it(`should display search place container`, () => {
        expect(fixture.debugElement.query(By.css('.map__search-place-container'))).toBeTruthy();
      });
      it(`should display no places in the list of places text`, () => {
        expect(fixture.debugElement.query(By.css('.map__places-list')).nativeElement.innerText)
          .toEqual('Enter name of place and hit Enter to add place')
      });
      it(`should add name of place on Enter hit of place input`, () => {
        const searchPlaceInput = fixture.debugElement.query(By.css('.map__search-place-field')).nativeElement;
        searchPlaceInput.value = 'Playa Doña Ana';
        searchPlaceInput.dispatchEvent(new KeyboardEvent('keyup', {
          key: 'enter',
        }));

        fixture.detectChanges();

        expect(component.places).toEqual(['Playa Doña Ana']);
      });
      it(`should display places that are added to the list`, () => {
        component.places = ['Playa Doña Ana'];

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('.map__places-list')).nativeElement.innerText.trim())
          .toEqual('Playa Doña Ana')
      });
    });
    describe(`map has not been loaded`, () => {
      beforeEach(() => {
        fixture.detectChanges();
      });
      it(`should not display search place field if map wasn't loaded`, () => {
        expect(fixture.debugElement.query(By.css('.map__search-place-field'))).toBeFalsy();
      });
      it(`should not display list of places`, () => {
        expect(fixture.debugElement.query(By.css('.map__places-list'))).toBeFalsy();
      });
    });
  });
});

@Component({
  selector: 'agm-map',
  template: '',
  styles: ['']
})
class AgmMock {
  @Input()
  latitude: any;
  @Input()
  longitude: any;
  @Input()
  mapTypeId: any;
  @Input()
  zoom: any;

  @Output()
  mapReady: EventEmitter<Event> = new EventEmitter<Event>();
}

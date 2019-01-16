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
    it(`should display search place field if map has been loaded`, () => {
      const agmMap: AgmMap = fixture.debugElement.query(By.css('.map__google-map')).componentInstance;

      agmMap.mapReady.emit(new Event('mapReady'));

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.map__search-place-field'))).toBeTruthy();
    });
    it(`should not display search place field if map wasn't loaded`, () => {
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.map__search-place-field'))).toBeFalsy();
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

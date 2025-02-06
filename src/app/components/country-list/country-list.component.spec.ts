import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CountryListComponent } from '../country-list/country-list.component';

class MockCountryService {
  getCountries() {
    return of([{ name: 'South Africa', flag: 'https://flagcdn.com/w320/za.png'}, { name: 'Nigeria', flag: 'https://flagcdn.com/w320/ng.png' }]);
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let countryService: CountryService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [CountryListComponent],
      imports: [CommonModule, CountryListComponent],
      providers: [
        { provide: CountryService, useClass: MockCountryService },
        { provide: Router, useClass: MockRouter }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ignore unknown elements
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    countryService = TestBed.inject(CountryService);
    router = TestBed.inject(Router);
    fixture.detectChanges(); // Ensures ngOnInit() runs
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch countries on initialization', () => {
    spyOn(countryService, 'getCountries').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(countryService.getCountries).toHaveBeenCalled();
    expect(component.countries.length).toBe(2);
    expect(component.countries[0].name).toBe('South Africa');
    expect(component.countries[0].flag).toBe('https://flagcdn.com/w320/za.png');
  });

  it('should navigate to country details when goToDetails is called', () => {
    const country = { name: 'Kenya' };
    component.goToDetails(country);
    expect(router.navigate).toHaveBeenCalledWith(['/country', 'Kenya'], { state: { country } });
  });
});

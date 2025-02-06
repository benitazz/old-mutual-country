import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryDetailComponent } from './country-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';  // Needed for standalone components
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { HttpClientModule } from '@angular/common/http';

describe('CountryDetailComponent', () => {
  let component: CountryDetailComponent;
  let fixture: ComponentFixture<CountryDetailComponent>;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    // Mock CountryService
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getCountriesDetails']);
    countryServiceSpy.getCountriesDetails.and.returnValue(of({ name: 'South Africa', 
      capital: 'Pretoria', flag: 'https://flagcdn.com/w320/za.png', population: 59308690 })); // Mock API response

    // Mock ActivatedRoute (not really used in this test)
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { queryParams: {} },
    });

    // Mock history.state
    Object.defineProperty(window, 'history', {
      value: {
        state: { country: { name: 'South Africa' } }, // Ensure this is correctly set
      },
      writable: true,
    });

    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientModule, CountryDetailComponent], // Import standalone component
      providers: [
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignore template errors
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger lifecycle hooks
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCountriesDetails on ngOnInit and populate country', () => {
    component.ngOnInit();
    expect(component.country).toEqual({ name: 'South Africa', capital: 'Pretoria', population: 59308690, flag: 'https://flagcdn.com/w320/za.png'});
  });

  it('should set countryname from history.state', () => {
    expect(component.countryname).toBe('South Africa');
  });
});

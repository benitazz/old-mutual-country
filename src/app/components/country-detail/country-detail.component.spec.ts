import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryDetailComponent } from './country-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';  // Import CommonModule for standalone components
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CountryService } from '../../services/country.service';

describe('CountryDetailComponent', () => {
  let component: CountryDetailComponent;
  let fixture: ComponentFixture<CountryDetailComponent>;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    // Create spies for CountryService and ActivatedRoute
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getCountriesDetails']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { queryParams: { country: { name: 'USA' } } },
    });

    await TestBed.configureTestingModule({
      imports: [CommonModule],  // Import CommonModule for standalone components
      providers: [
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown components or directives
    }).compileComponents();
  });

  beforeEach(() => {
    // Mock the history state before component creation
    const mockHistoryState = { country: { name: 'USA' } };
    Object.defineProperty(window, 'history', {
      value: {
        state: mockHistoryState,
      },
      writable: true,
    });

    fixture = TestBed.createComponent(CountryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCountriesDetails on ngOnInit and populate country', () => {
    const countryData = { name: 'USA', capital: 'Washington D.C.' }; // Mock data
    countryServiceSpy.getCountriesDetails.and.returnValue(of(countryData));

    component.ngOnInit();

    expect(countryServiceSpy.getCountriesDetails).toHaveBeenCalledOnceWith('USA');
    expect(component.country).toEqual(countryData);
  });

  it('should set countryname from history.state', () => {
    expect(component.countryname).toBe('USA');
  });
});

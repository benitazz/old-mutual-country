import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryDetailComponent } from './country-detail.component';
import { CountryService } from '../../services/country.service';
import { LoadingService } from '../../services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ODPipeModule } from '../../pipes/od-pipe.module';

describe('CountryDetailComponent', () => {
  let component: CountryDetailComponent;
  let fixture: ComponentFixture<CountryDetailComponent>;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    countryServiceSpy = jasmine.createSpyObj('CountryService', ['getCountriesDetails']);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);

    Object.defineProperty(history, 'state', {
      value: { country: { name: 'South Africa' } },
      writable: true
    });

    await TestBed.configureTestingModule({
      imports: [CountryDetailComponent, CommonModule, ODPipeModule],
      providers: [
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'South Africa' } } } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDetailComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); // Ensures lifecycle hooks run
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch country details on init', () => {
    const mockCountryData = { name: 'South Africa', flag: 'https://flagcdn.com/w320/za.png',  capital: 'Pretoria', population: 59308690 };
    countryServiceSpy.getCountriesDetails.and.returnValue(of(mockCountryData));

    component.ngOnInit();
    expect(loadingServiceSpy.show).toHaveBeenCalled();
    expect(countryServiceSpy.getCountriesDetails).toHaveBeenCalledWith('South Africa');
    expect(component.country).toEqual(mockCountryData);
    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  });

  /*it('should handle error when fetching country details', () => {
    const errorMessage = new Error('API Error');
    countryServiceSpy.getCountriesDetails.and.returnValue(throwError(() => errorMessage));
    spyOn(console, 'error');

    component.ngOnInit();
    expect(loadingServiceSpy.show).toHaveBeenCalled();
    expect(countryServiceSpy.getCountriesDetails).toHaveBeenCalledWith('test-country');
    expect(console.error).toHaveBeenCalledWith(errorMessage);
    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  });*/
});

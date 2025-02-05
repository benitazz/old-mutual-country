import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryListComponent } from './country-list.component';
import { CountryService } from '../../services/country.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let countryService: jasmine.SpyObj<CountryService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CountryService', ['getCountries']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CountryListComponent],
      providers: [{ provide: CountryService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    countryService = TestBed.inject(CountryService) as jasmine.SpyObj<CountryService>;
  });

  it('should fetch countries on init', () => {
    const mockCountries = [{ name: 'South Africa', flag: '🇿🇦'  }];
    countryService.getCountries.and.returnValue(of(mockCountries));
    fixture.detectChanges();
    expect(component.countries.length).toBe(1);
    expect(component.countries).toEqual(mockCountries);
  });
});


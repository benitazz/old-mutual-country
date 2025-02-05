import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountryService } from './country.service';
import { environment } from '../../environments/environment';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService]
    });
    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no outstanding requests remain
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch countries list', () => {
    const dummyCountries = [
      { name: 'South Africa', flag: 'https://flagcdn.com/w320/za.png' },
      { name: 'Germany', flag: 'https://flagcdn.com/w320/de.png' }
    ];

    service.getCountries().subscribe((countries) => {
      expect(countries.length).toBe(2);
      expect(countries).toEqual(dummyCountries);
    });

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCountries);
  });

  it('should fetch country details by name', () => {
    const countryName = 'Germany';
    const dummyCountryDetails = [{ name: 'Germany', flag: 'https://flagcdn.com/w320/de.png', population: 83240525, capital: "Berlin" }];

    service.getCountriesDetails(countryName).subscribe((country) => {
      expect(country).toEqual(dummyCountryDetails);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/${countryName}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCountryDetails);
  });
});


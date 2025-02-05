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

  it('should retrieve countries from API', () => {
    const mockCountries = [{ name:'South Africa' , flag :'🇿🇦'  }];
    service.getCountries().subscribe(countries => {
      expect(countries.length).toBe(1);
      expect(countries).toEqual(mockCountries);
    });
    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });

  afterEach(() => {
    httpMock.verify();
  });
});


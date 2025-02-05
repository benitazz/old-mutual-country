import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryDetailComponent } from './country-detail.component';

describe('CountryDetailComponent', () => {
  let component: CountryDetailComponent;
  let fixture: ComponentFixture<CountryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display country details correctly', () => {
    const mockCountry = {
      name: 'South Africa',
      capital: 'Pretoria',
      population: 59308690,
      flag: 'https://flagcdn.com/w320/za.png'
    };

    component.country = mockCountry;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('South Africa');
    expect(compiled.querySelector('p').textContent).toContain('Pretoria');
    expect(compiled.querySelector('img').src).toContain('https://flagcdn.com/w320/za.png');
  });
})
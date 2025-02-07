import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-country-list',
  imports: [CommonModule],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent implements OnInit {
  countries: any[] = [];

  constructor(
    private countryService: CountryService, 
    private router: Router,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.show();

    this.countryService.getCountries().subscribe({
      next: (data) => this.countries = data,
      error: (error) => console.log(error),
      complete: () => this.loadingService.hide()
    });
  }

  goToDetails(country: any) {
    this.router.navigate(['/countrydetail', country.name], { state: { country } });
  }
}

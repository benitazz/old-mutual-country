import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CommonModule} from '@angular/common';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-detail',
  imports: [CommonModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss'
})
export class CountryDetailComponent {

  country: any;
  countryname: string;

  constructor(private countryService: CountryService, private route: ActivatedRoute) {
    this.countryname = history.state.country?.name;
  }


  ngOnInit(): void {
    this.countryService.getCountriesDetails(this.countryname).subscribe(data => {
      this.country = data;
    });
  }

}

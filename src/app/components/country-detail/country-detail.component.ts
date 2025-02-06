import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { ODPipeModule } from '../../pipes/od-pipe.module';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-country-detail',
  imports: [CommonModule, ODPipeModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss'
})
export class CountryDetailComponent {

  country: any;
  countryname: string;

  constructor(private countryService: CountryService, 
    private route: ActivatedRoute, 
    private loadingService: LoadingService) {
    this.countryname = history.state.country?.name;
  }


  ngOnInit(): void {
    this.loadingService.show();

    this.countryService.getCountriesDetails(this.countryname).subscribe(
      {
        next: (data) => this.country = data,
        error: (error) => console.log(error),
        complete: () => this.loadingService.hide()
      });
  }
}

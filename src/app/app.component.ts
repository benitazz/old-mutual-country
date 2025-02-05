import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CountryListComponent } from './components/country-list/country-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, CountryListComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'old-mutual-country';
}

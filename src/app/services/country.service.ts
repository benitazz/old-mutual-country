import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  getCountries(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl)
    .pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
    );
  }

  getCountriesDetails(name: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${name}`)
    .pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
    );
  }
}
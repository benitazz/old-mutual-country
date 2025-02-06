import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root' // This ensures the service is available application-wide
})
export class ErrorHandlerService {
  
  constructor(private toastService: ToastService) {}

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server error (${error.status}): ${error.message}`;
    }

    console.error('ErrorHandlerService:', errorMessage); // Log error globally
    this.toastService.showToast(errorMessage, 'danger'); // Trigger toast message

    return throwError(() => new Error(errorMessage));
  }
}
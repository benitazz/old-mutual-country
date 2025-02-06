import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastTriggered = new EventEmitter<{ message: string; type: 'success' | 'danger' | 'info' | 'warning' }>();

  showToast(message: string, type: 'success' | 'danger' | 'info' | 'warning' = 'info') {
    this.toastTriggered.emit({ message, type });
  }
}

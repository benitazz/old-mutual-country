import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastService } from '../../services/toast.service';
declare var bootstrap: any;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  message: string = '';
  type: 'success' | 'danger' | 'info' | 'warning' = 'info';

  @ViewChild('toastElement', { static: true }) toastElement!: ElementRef;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toastTriggered.subscribe(({ message, type }) => {
      this.message = message;
      this.type = type;
      this.showToast();
    });
  }

  showToast() {
    const toastInstance = new bootstrap.Toast(this.toastElement.nativeElement);
    toastInstance.show();
  }
}

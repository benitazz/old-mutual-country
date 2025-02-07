import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-overlay',
  imports: [MatProgressBarModule, CommonModule],
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent {
  constructor(public loadingService: LoadingService) { }
}

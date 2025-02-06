import { NgModule } from '@angular/core';
import { ReadableNumberPipe } from './readable-number.pipe';


@NgModule({
  imports: [ReadableNumberPipe],
  exports: [ReadableNumberPipe] // Re-export so other components can use it
})
export class ODPipeModule {}
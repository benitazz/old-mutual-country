import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readableNumber',
  standalone: true // Declare it as standalone
})
export class ReadableNumberPipe implements PipeTransform {
  transform(value: number | bigint): string {
    if (typeof value === 'bigint') {
      value = Number(value);
    }
    
    const isNegative = value < 0; // Store whether the value is negative
    value = Math.abs(value); // Work with the absolute value for formatting
    
    if (value < 1000) {
      return isNegative ? `-${value}` : value.toString();
    }

    const units = ['K', 'M', 'B', 'T', 'Q']; // Extend unit list (thousands, millions, billions, trillions, quadrillions, etc.)
    const number = value;
    const order = Math.floor(Math.log10(number) / 3);
    
    // If the order exceeds the unit array, we handle it by adding more units.
    const unitName = units[Math.min(order - 1, units.length - 1)];

    const formattedValue = (value / Math.pow(1000, order)).toFixed(1);
    return isNegative ? `-${formattedValue}${unitName}` : `${formattedValue}${unitName}`;
  }
}

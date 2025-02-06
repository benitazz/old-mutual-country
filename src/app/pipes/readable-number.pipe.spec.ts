import { TestBed } from '@angular/core/testing';
import { ReadableNumberPipe } from './readable-number.pipe';

describe('ReadableNumberPipe', () => {
  let pipe: ReadableNumberPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadableNumberPipe],
    });
    pipe = TestBed.inject(ReadableNumberPipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a number less than 1000 to its string representation', () => {
    expect(pipe.transform(500)).toBe('500');
    expect(pipe.transform(0)).toBe('0');
    expect(pipe.transform(-500)).toBe('-500');
  });

  it('should transform numbers greater than or equal to 1000 to a readable format', () => {
    expect(pipe.transform(1500)).toBe('1.5K');
    expect(pipe.transform(2500000)).toBe('2.5M');
    expect(pipe.transform(4000000000)).toBe('4.0B');
    expect(pipe.transform(1000000000000)).toBe('1.0T');
  });

  it('should handle negative numbers correctly', () => {
    expect(pipe.transform(-1500)).toBe('-1.5K');
    expect(pipe.transform(-2500000)).toBe('-2.5M');
  });

  it('should return the number as a string when the value is a bigint', () => {
    expect(pipe.transform(BigInt(1500))).toBe('1.5K');
    expect(pipe.transform(BigInt(1000000000000))).toBe('1.0T');
  });

  it('should handle zero correctly', () => {
    expect(pipe.transform(0)).toBe('0');
  });

});

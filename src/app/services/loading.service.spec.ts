import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when show() is called', (done) => {
    service.loading$.subscribe((isLoading) => {
      if (isLoading) {
        expect(isLoading).toBeTrue();
        done();
      }
    });
    service.show();
  });

  it('should emit false when hide() is called', (done) => {
    service.show(); // First, set loading to true
    service.loading$.subscribe((isLoading) => {
      if (!isLoading) {
        expect(isLoading).toBeFalse();
        done();
      }
    });
    service.hide();
  });
});

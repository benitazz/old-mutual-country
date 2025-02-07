import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit toastTriggered event with correct message and type', (done) => {
    const testMessage = 'Test Message';
    const testType = 'success';

    service.toastTriggered.subscribe(({ message, type }) => {
      expect(message).toBe(testMessage);
      expect(type).toBe(testType);
      done();
    });

    service.showToast(testMessage, testType);
  });

  it('should use default type as info when no type is provided', (done) => {
    const testMessage = 'Default Type Test';

    service.toastTriggered.subscribe(({ message, type }) => {
      expect(message).toBe(testMessage);
      expect(type).toBe('info');
      done();
    });

    service.showToast(testMessage);
  });
});

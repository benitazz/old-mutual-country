import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from '../../services/toast.service';
import { EventEmitter, ElementRef } from '@angular/core';

declare var bootstrap: any;

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['toastTriggered']);
    toastServiceSpy.toastTriggered = new EventEmitter<{ message: string; type: 'success' | 'danger' | 'info' | 'warning' }>();

    await TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers: [
        { provide: ToastService, useValue: toastServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    component.toastElement = new ElementRef(document.createElement('div'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set message and type when toast is triggered', () => {
    toastServiceSpy.toastTriggered.emit({ message: 'Test Message', type: 'success' });
    expect(component.message).toBe('Test Message');
    expect(component.type).toBe('success');
  });

  it('should call showToast when toast is triggered', () => {
    spyOn(component, 'showToast');
    component.ngOnInit();
    toastServiceSpy.toastTriggered.emit({ message: 'Test Message', type: 'success' });
    expect(component.showToast).toHaveBeenCalled();
  });

  it('should show toast using Bootstrap', () => {
    const toastInstanceSpy = jasmine.createSpyObj('Toast', ['show']);
    spyOn(bootstrap, 'Toast').and.returnValue(toastInstanceSpy);

    component.showToast();

    expect(bootstrap.Toast).toHaveBeenCalledWith(component.toastElement.nativeElement);
    expect(toastInstanceSpy.show).toHaveBeenCalled();
  });
});

import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {NotificationsComponent} from '../../app/notifications/notifications.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';
import {WebsocketService} from '../../app/notifications/websocket.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('Notifications component', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  const socketService: WebsocketService = new WebsocketService();

  const fakeSocket: Observable<string> = of('message');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        MatDialog,
        { provide: WebsocketService, useValue: socketService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;

    spyOn(socketService, 'getSocket').and.returnValue(fakeSocket);
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('message shoud contain the notification text', fakeAsync(() => {
    fixture.detectChanges();
    expect(socketService.getSocket).toHaveBeenCalled();

    tick(1000);

    expect(component.msg).toBe('message');

    flushMicrotasks();
  }));
});

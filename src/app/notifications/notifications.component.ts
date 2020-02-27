import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NotificationsPopupComponent} from './notifications.popup.component';
import {WebsocketService} from './websocket.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  constructor(public dialog: MatDialog,
              private websocketService: WebsocketService) {
  }

  msg: string;

  ngOnInit() {
    this.websocketService.getSocket().subscribe({
      next : (data) => { this.msg = data, this.openNotificationPopup(data); },
      error : (err) => console.log(err),
      complete : () => {}
    });
  }

  openNotificationPopup(message: string): void {
    this.dialog.open(NotificationsPopupComponent, {
      width: '250px',
      data: message
    });
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NotificationsPopupComponent} from './notifications.popup.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  ws =  webSocket({
    url: 'ws://localhost:8080/notifications',
    deserializer: msg => msg.data
  });

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.ws.subscribe({
      next : (data) => {this.openNotificationPopup(data); },
      error : (err) => console.log(err),
      complete : () => {}
    });
  }

  openNotificationPopup(message: string): void {
    const dialogRef = this.dialog.open(NotificationsPopupComponent, {
      width: '250px',
      data: message
    });
  }
}

import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-notifications-popup',
  templateUrl: 'notifications.popup.component.html',
  styleUrls: ['./notifications.popup.component.css']
})
export class NotificationsPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<NotificationsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onClick(): void {
    this.dialogRef.close();
  }
}

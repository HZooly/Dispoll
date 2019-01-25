import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: 'help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialog {

  constructor(
    public dialogRef: MatDialogRef<HelpDialog>) {}

  close(): void {
    this.dialogRef.close();
  }

}

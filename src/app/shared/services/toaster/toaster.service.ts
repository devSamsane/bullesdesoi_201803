import { Injectable, Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class ToasterService {
  config = new MatSnackBarConfig();

  constructor(private snackBar: MatSnackBar) {}

  showAlertToaster(msg: string, className: string) {
    this.snackBar.open(msg, null, {
      duration: 3000,
      panelClass: [className]
    });
  }

  showInformationToaster(msg: string, className: string) {
    this.snackBar.open(msg, null, {
      duration: 3000,
      panelClass: [className]
    });
  }
}

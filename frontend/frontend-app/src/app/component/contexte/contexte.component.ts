import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contexte',
  templateUrl: './contexte.component.html',
  styleUrl: './contexte.component.css'
})
export class ContexteComponent {
  constructor(private dialogRef: MatDialogRef<ContexteComponent>) {}

  closePop() {
    this.dialogRef.close();
  }

}

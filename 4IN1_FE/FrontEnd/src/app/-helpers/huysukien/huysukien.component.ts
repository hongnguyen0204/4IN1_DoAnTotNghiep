import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-huysukien',
  templateUrl: './huysukien.component.html',
  styleUrls: ['./huysukien.component.scss']
})
export class HuysukienComponent implements OnInit {

  // @ts-ignore
  title: string;
  // @ts-ignore
  message: string;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}

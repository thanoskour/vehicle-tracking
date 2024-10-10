import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-edit-record-dialog',
  standalone: true,
  imports:[MatNativeDateModule,MatDatepickerModule,MatSelectModule,MatTableModule,MatInputModule,CommonModule,FormsModule],
  template: `
    <h1 mat-dialog-title>Edit Record</h1>
    <div mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Serial Number</mat-label>
        <input matInput [(ngModel)]="data.record.serialNumber">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Issue Date</mat-label>
        <input matInput [matDatepicker]="picker" [(ngModel)]="data.record.issueDate">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Reward Amount</mat-label>
        <input matInput [(ngModel)]="data.record.rewardAmount">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Driver</mat-label>
        <input matInput [(ngModel)]="data.record.fullName">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Reward Scale</mat-label>
        <input matInput [(ngModel)]="data.record.tierAmount">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Entry Amount</mat-label>
        <input matInput [(ngModel)]="data.record.registrationAmount">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Consumption Amount</mat-label>
        <input matInput [(ngModel)]="data.record.consumptionAmount">
      </mat-form-field>

    </div>
    <div mat-dialog-actions>
      <button mat-button color = 'warn' (click)="onCancel()">Cancel</button>
      <button mat-button color='primary' (click)="onSave()">Save</button>
    </div>
  `,
  styles: [`
    /* General Styling for the Dialog */
    .mat-dialog-container {
      background-color: white;
      border-radius: 8px;
      padding: 24px;
    }


    mat-dialog-content {
      background-color: white; /* Set background to white */
      border-radius: 8px;
      padding: 16px;
    }

    h1 {
      color: #1662d3; /* Change title color if needed */
    }

    mat-dialog-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }
    /* Form Field Styling */
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }


    button {
      border-radius: 20px;
      padding: 8px 16px;
      font-weight: bold;
      color: white;
      min-width: 80px;
    }

    button[color="primary"] {
      background-color: #4caf50; /* Green for Save */
    }

    button[color="primary"]:hover {
      background-color: #388e3c; /* Darker Green on Hover */
    }

    button[color="warn"] {
      background-color: #f44336; /* Red for Cancel */
    }

    button[color="warn"]:hover {
      background-color: #d32f2f; /* Darker Red on Hover */
    }

    /* Title Styling */
    h1 {
      color: #1662d3;
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 16px;
    }
  `]
})
export class EditRecordDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditRecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.data.record) {
      this.dialogRef.close(this.data.record);
      console.log("Saved");
    } else {
      this.dialogRef.close();
    }
  }

}

import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EditRecordDialogComponent } from '../edit-record-dialog/edit-record-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTable } from '@angular/material/table';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-vehicle-details',
  standalone : true,
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
  imports : [MatChipsModule,MatNativeDateModule,MatDatepickerModule,ReactiveFormsModule,FormsModule,MatTableModule,CommonModule,MatInputModule,MatSelectModule,MatOptionModule,MatSortModule,MatPaginatorModule,RouterLink,MatDialogModule,MatCardModule],

})


export class VehicleDetailsComponent implements OnInit {


  vehicleId: string | null = null;
  vehicle: any = null;
  displayedColumns: string[] = ['serialNumber',
                                  'driver',
                                  'issueDate',
                                  'status',
                                  'rewardScale',
                                  'entryAmount',
                                  'consumptionAmount',
                                  'rewardAmount',
                                  'actions'];
  dataSource = new MatTableDataSource<any>();
  selectedFilter: string = 'serialNumber';

  serialNumberFilter: string = '';
  selectedDriver: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  selectedStatus: string = 'all';

  drivers: any[] = [];
  originalData: any[] = [];


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;


  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private dialog: MatDialog

  ) {}


  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.paramMap.get('id');

    if (this.vehicleId) {
      this.dataService.getVehicleById(this.vehicleId).subscribe((vehicle) => {
        this.vehicle = vehicle;
        if (this.vehicle) {
          this.loadRecordsForVehicle();
        } else {
          console.log(`No vehicle found with ID ${this.vehicleId}`);
        }
      });
    }
    this.loadDrivers();

  }

  loadDrivers(): void {
    this.dataService.getDrivers().subscribe((drivers: any[]) => {
      this.drivers = drivers;
    });
  }

  loadRecordsForVehicle(): void {
    if (!this.vehicle) {
      return;
    }

    this.dataService.getRecords().subscribe((records: any[]) => {
      const vehicleRecords = records
      .filter(record => record.plate === this.vehicle.plate)
      .map(record => ({
        ...record,
        issueDate: this.formatDateString(record.issueDate)
      }));

      this.originalData = vehicleRecords;

      this.dataSource.data = vehicleRecords;

      this.dataSource.sort = this.sort;

      this.dataSource.paginator = this.paginator;

    });

  }

  applyFilters(): void {
    const filteredData = this.originalData.filter(record => {
      const matchesSerialNumber = !this.serialNumberFilter ||
        record.serialNumber.includes(this.serialNumberFilter);

      const matchesDriver = !this.selectedDriver ||
        record.driverId === this.selectedDriver;

      const matchesStatus = !this.selectedStatus ||
        (this.selectedStatus === 'approved' && record.isApproved) ||
        (this.selectedStatus === 'cancelled' && !record.isApproved);

      let matchesDateRange = true;
      if (this.startDate && this.endDate) {
        const recordDate = new Date(record.issueDate);
        matchesDateRange = recordDate >= this.startDate && recordDate <= this.endDate;
      }

      return matchesSerialNumber && matchesDriver && matchesStatus && matchesDateRange;
    });

    this.dataSource.data = filteredData;
  }




  editRecord(record: any): void {
    const dialogRef = this.dialog.open(EditRecordDialogComponent, {
      data: { record: { ...record } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the record in the data source
        const index = this.dataSource.data.findIndex(r => r.serialNumber === result.serialNumber);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource._updateChangeSubscription();
        }
      }
    });
    console.log('Updated record:', record);
  }




  deleteRecord(record: any): void {
    const index = this.dataSource.data.indexOf(record);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
    console.log('Deleted record:', record);
  }

  formatDateString(dateString: string): Date {
    const year = parseInt(dateString.slice(0, 4), 10);
    const month = parseInt(dateString.slice(4, 6), 10) - 1;
    const day = parseInt(dateString.slice(6, 8), 10);
    return new Date(year, month, day);
  }



}

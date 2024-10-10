import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { DataService } from '../data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule,MatPaginator,RouterModule, NgFor,CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent {
  displayedColumns: string[] = [ 'plate'];
  vehicles: any[] = [];
  filteredVehicles: any[] = [];
  vehicleFilter: string = '';


  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.dataService.getVehicles().subscribe((vehicles: any[]) => {
      this.vehicles = vehicles;
      this.filteredVehicles = vehicles;
    });
  }

  applyFilter(): void {
    const filterValue = this.vehicleFilter.toLowerCase().trim();
    this.filteredVehicles = this.vehicles.filter(vehicle =>
      vehicle.plate.toLowerCase().includes(filterValue)
    );
  }


}

import { Routes } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';

export const routes: Routes = [
  { path: '', component: VehicleListComponent },
  { path: 'vehicle/:id', component: VehicleDetailsComponent }
];

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<any> {
    return this.http.get<any[]>('/assets/vehicles.json');
  }

  getDrivers(): Observable<any> {
    return this.http.get<any[]>('/assets/drivers.json');
  }

  getRecords(): Observable<any[]> {
    return this.http.get<any[]>('/assets/records.json');
  }

  getVehicleById(id: string): Observable<any> {
    return this.getVehicles().pipe(
      map((vehicles: any[]) => vehicles.find((v) => v.id === parseInt(id, 10)))
    );
  }
}

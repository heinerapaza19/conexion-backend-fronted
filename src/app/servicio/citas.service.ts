import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitasServicio {
  private urlBase = 'http://localhost:8080/citas'; // 👈 Ajusta según tu endpoint real

  constructor(private clientehttp: HttpClient) {}

  obtenerCitas(): Observable<Cita[]> {
    return this.clientehttp.get<Cita[]>(this.urlBase);
  }

  eliminarCita(id: number): Observable<void> {
    return this.clientehttp.delete<void>(`${this.urlBase}/${id}`);
  }
}

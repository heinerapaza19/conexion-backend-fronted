import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cita } from '../../models/cita.model';
import { CitasServicio } from '../../servicio/citas.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas.html',
})
export class Citas implements OnInit {
  citas: Cita[] = []; // ✅ Declarado correctamente

  constructor(private citasServicio: CitasServicio) {}

  ngOnInit(): void {
    this.obtenerCitas();
  }

  obtenerCitas(): void {
    this.citasServicio.obtenerCitas().subscribe({
      next: (data: Cita[]) => {  // ✅ Forzamos el tipo aquí
        console.log('📅 Citas obtenidas:', data);
        this.citas = data;
      },
      error: (err) => console.error('❌ Error al obtener citas:', err),
    });
  }

  eliminarCita(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta cita?')) {
      this.citasServicio.eliminarCita(id).subscribe({
        next: () => {
          console.log(`🗑️ Cita ${id} eliminada`);
          this.citas = this.citas.filter((c) => c.id !== id);
        },
        error: (err) => console.error('❌ Error al eliminar cita:', err),
      });
    }
  }
}

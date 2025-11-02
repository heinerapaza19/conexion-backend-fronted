import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../servicio/medico.service';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medicos.html',
})
export class Medicos implements OnInit {
  medicos: Medico[] = [];
  medicoActual: Medico = { nombre: '', apellido: '', especialidad: '', telefono: '', email: '', dni: '' };
  editando = false;

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.medicoService.listar().subscribe({
      next: (data) => (this.medicos = data),
      error: (err) => console.error('❌ Error al listar médicos:', err),
    });
  }

  guardar(): void {
    if (this.editando && this.medicoActual.id) {
      // 🔹 Actualizar médico existente
      this.medicoService.actualizar(this.medicoActual.id, this.medicoActual).subscribe({
        next: () => {
          console.log('✅ Médico actualizado');
          this.listar();
          this.cancelar();
        },
        error: (err) => console.error('❌ Error al actualizar médico:', err),
      });
    } else {
      // 🔹 Agregar nuevo médico
      this.medicoService.crear(this.medicoActual).subscribe({
        next: () => {
          console.log('✅ Médico agregado');
          this.listar();
          this.medicoActual = { nombre: '', apellido: '', especialidad: '', telefono: '', email: '', dni: '' };
        },
        error: (err) => console.error('❌ Error al agregar médico:', err),
      });
    }
  }

  editar(medico: Medico): void {
    this.medicoActual = { ...medico }; // copia para editar
    this.editando = true;
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este médico?')) {
      this.medicoService.eliminar(id).subscribe({
        next: () => {
          console.log('🗑️ Médico eliminado');
          this.listar();
        },
        error: (err) => console.error('❌ Error al eliminar médico:', err),
      });
    }
  }

  cancelar(): void {
    this.editando = false;
    this.medicoActual = { nombre: '', apellido: '', especialidad: '', telefono: '', email: '', dni: '' };
  }
}

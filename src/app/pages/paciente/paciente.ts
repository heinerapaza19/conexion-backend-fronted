import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../servicio/paciente.service';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paciente.html'
})
export class Pacientes implements OnInit {
  pacientes: Paciente[] = [];
  pacienteActual: Paciente = { dni: '', nombre: '', apellido: '', fechaNacimiento: '', telefono: '' };
  editando = false;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.pacienteService.listar().subscribe({
      next: (data) => (this.pacientes = data),
      error: (err) => console.error('❌ Error al listar pacientes:', err),
    });
  }

  guardar(): void {
    if (this.editando && this.pacienteActual.id) {
      this.pacienteService.actualizar(this.pacienteActual.id, this.pacienteActual).subscribe({
        next: () => {
          console.log('✅ Paciente actualizado');
          this.listar();
          this.cancelar();
        },
        error: (err) => console.error('❌ Error al actualizar paciente:', err),
      });
    } else {
      this.pacienteService.crear(this.pacienteActual).subscribe({
        next: () => {
          console.log('✅ Paciente creado');
          this.listar();
          this.cancelar();
        },
        error: (err) => console.error('❌ Error al crear paciente:', err),
      });
    }
  }

  editar(paciente: Paciente): void {
    this.pacienteActual = { ...paciente };
    this.editando = true;
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este paciente?')) {
      this.pacienteService.eliminar(id).subscribe({
        next: () => {
          console.log('🗑️ Paciente eliminado');
          this.listar();
        },
        error: (err) => console.error('❌ Error al eliminar paciente:', err),
      });
    }
  }

  cancelar(): void {
    this.editando = false;
    this.pacienteActual = { dni: '', nombre: '', apellido: '', fechaNacimiento: '', telefono: '' };
  }
}

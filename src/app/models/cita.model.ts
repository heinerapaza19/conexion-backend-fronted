export interface Cita {
  id?: number;
  fecha: string;
  motivo: string;
  paciente: {
    id: number;
    nombre: string;
    apellido: string;
  };
  medico: {
    id: number;
    nombre: string;
    apellido: string;
  };
}

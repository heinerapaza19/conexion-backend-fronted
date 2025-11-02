import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // 👈 Para conectar con Spring Boot
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Mejora el rendimiento de detección de cambios
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Habilita las rutas (Inicio, Médicos, Pacientes, Citas, etc.)
    provideRouter(routes),

    // Permite usar HttpClient (para consumir tu API REST)
    provideHttpClient()

    
  ]
};

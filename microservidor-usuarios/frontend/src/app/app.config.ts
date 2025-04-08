import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Importa provideHttpClient 

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Configuración de detección de cambios
    provideRouter(routes), // Configuración de rutas
    provideClientHydration(withEventReplay()), // Hidratación del lado del cliente
    provideHttpClient(withFetch()), // Configura HttpClient para toda la aplicación
    
  ]
};
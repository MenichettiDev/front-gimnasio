import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BarrasupComponent } from './app/shared/barrasup/barrasup.component';

const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    BarrasupComponent, // Registra BarrasupComponent en los proveedores
  ],
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch((err) => console.error(err));

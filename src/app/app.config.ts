import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpFeatureKind, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authenInterceptor } from './interceptors/authen.interceptor';
import { erroresInterceptor } from './interceptors/errores.interceptor';
import { spinnerInterceptor } from './interceptors/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([
        authenInterceptor,
        erroresInterceptor,
        spinnerInterceptor
      ])
    )
  ]

};

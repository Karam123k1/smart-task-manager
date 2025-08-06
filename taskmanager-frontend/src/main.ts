import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

const enhancedConfig = {
  appConfig,
  providers: [appConfig.providers || [], provideHttpClient(withFetch())],
};

bootstrapApplication(AppComponent, enhancedConfig).catch((err) =>
  console.error(err)
);

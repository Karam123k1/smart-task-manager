import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { App } from './app/app';

const enhancedConfig = {
  appConfig,
  providers: [appConfig.providers || [], provideHttpClient(withFetch())],
};

bootstrapApplication(App, enhancedConfig).catch((err) => console.error(err));

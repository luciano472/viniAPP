// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { Amplify } from 'aws-amplify';
import { environment } from './environments/environment';
import { platformBrowser } from '@angular/platform-browser';
import { initializeApp } from 'firebase/app';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: environment.cognito.userPoolId,
      userPoolClientId: environment.cognito.clientId,
    },
  },
});
// Firebase se inicializa una sola vez, antes de arrancar la app
initializeApp(environment.firebase);

platformBrowser().bootstrapModule(AppModule)
  .catch(err => console.log(err));
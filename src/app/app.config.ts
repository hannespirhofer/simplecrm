import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "simple-crm-5b2a4", "appId": "1:418012996982:web:6a45638fdd52e33beb4657", "storageBucket": "simple-crm-5b2a4.appspot.com", "apiKey": "AIzaSyAanWF4VHBNa-gVr6kDKPjruf04HDCc998", "authDomain": "simple-crm-5b2a4.firebaseapp.com", "messagingSenderId": "418012996982" }))),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    { provide: LOCALE_ID, useValue: 'de-DE' }
  ]
};


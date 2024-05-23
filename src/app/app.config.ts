import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"estudio1-2eac0","appId":"1:619799004073:web:58facf89b51138bd4bbab8","storageBucket":"estudio1-2eac0.appspot.com","apiKey":"AIzaSyDLKRlCv_-ywsq-kxJTrw3S7tydrFhQ6Vc","authDomain":"estudio1-2eac0.firebaseapp.com","messagingSenderId":"619799004073","measurementId":"G-VY8G88E5CP"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};

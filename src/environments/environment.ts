// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  cognito: 
  {
    userPoolId: 'us-east-2_1DQEQAzvU',
    clientId: '3oid200eubnnaukr50jgs5lq35',
  },
  firebase: {
    apiKey: 'AIzaSyCZ2kHCGWxW76hH04et0RtA5GFOlqtGPnk',
    authDomain: 'viniapp-8fab2.firebaseapp.com',
    projectId: 'viniapp-8fab2',
    storageBucket: 'viniapp-8fab2.firebasestorage.app',
    messagingSenderId: '217378531011',
    appId: '1:217378531011:web:c23dbd7653766c284ba476',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  api_url: 'http://localhost:5555/api/',
  province_api: 'https://provinces.open-api.vn/api/?depth=3',
  firebase: {
    apiKey: 'AIzaSyB-nck035aktj_6EUlqYIOhL7uuwBAWOx0',
    authDomain: 'lapstore-1de36.firebaseapp.com',
    projectId: 'lapstore-1de36',
    storageBucket: 'lapstore-1de36.appspot.com',
    messagingSenderId: '452167768176',
    appId: '1:452167768176:web:7b19229d01e00910687cb5',
    measurementId: 'G-G8MNR4ZJH8',
  },
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

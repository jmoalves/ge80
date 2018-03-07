import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SettingsProvider } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { PatrulhaProvider } from '../providers/patrulha/patrulha';
import { TorneioProvider } from '../providers/torneio/torneio';
import { JovensProvider } from '../providers/jovens/jovens';

import { DateService } from '../services/date.service';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AppHeaderComponent } from '../components/app-header/app-header';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new SettingsProvider(storage, {
    apiURL: 'https://ge80-184421.appspot.com'
    // apiURL: 'http://192.168.15.39:8080'
    // apiURL: ''
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    { provide: SettingsProvider, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PatrulhaProvider,
    TorneioProvider,
    JovensProvider,
    DateService,
    FirebaseProvider
  ]
})
export class AppModule { }

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { MessageDetailPage } from '../pages/message-detail/message-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireList } from 'angularfire2/database';
import { Health } from '@ionic-native/health';
import { Firebase } from '@ionic-native/firebase';

import { ComponentsModule} from "../components/components.module";
import { MessageDetailComponent } from "../components/message-detail/message-detail";
import { MessageGraphComponent } from "../components/message-graph/message-graph";
import { MessageChallengeComponent } from "../components/message-challenge/message-challenge";
import { MessageStreakComparisonComponent } from "../components/message-streak-comparison/message-streak-comparison";
import { MessageStatasComparisonComponent } from "../components/message-statas-comparison/message-statas-comparison";

import { MainPipe } from "../app/main-pipe.module";
import { FcmProvider } from '../providers/fcm/fcm';

import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { NouisliderModule } from "ng2-nouislider";

import * as moment from 'moment';


export const firebaseConfig = {
    apiKey: "AIzaSyDhDTAneynml0xSi2mNIXJ8yuryl-hJOz0",
    authDomain: "step-customer.firebaseapp.com",
    databaseURL: "https://step-customer.firebaseio.com",
    projectId: "step-customer",
    storageBucket: "step-customer.appspot.com",
    messagingSenderId: "794485454653"
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    MessageDetailPage,
    MessageDetailComponent,
    MessageGraphComponent,
    MessageChallengeComponent,
    MessageStreakComparisonComponent,
    MessageStatasComparisonComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MainPipe,
    IonRangeSliderModule,
    NouisliderModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    MessageDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Health,
    Firebase,
    FcmProvider
  ]
})
export class AppModule {}

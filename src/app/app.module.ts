import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { BookListPage } from '../pages/book-list/book-list';
import { LendBookPage } from '../pages/lend-book/lend-book';
import { CdListPage } from '../pages/cd-list/cd-list';
import { LendCDPage } from '../pages/lend-cd/lend-cd';
import { SettingsPage } from '../pages/settings/settings';
import { ItemsService } from '../services/items.service';
import { AuthService } from '../services/auth.service';
import { AuthPage } from '../pages/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    BookListPage,
    LendBookPage,
    CdListPage,
    LendCDPage,
    SettingsPage,
    AuthPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    BookListPage,
    LendBookPage,
    CdListPage,
    LendCDPage,
    SettingsPage,
    AuthPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ItemsService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

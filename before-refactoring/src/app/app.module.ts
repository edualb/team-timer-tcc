import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Insomnia } from '@ionic-native/insomnia';
import { AdMobFree } from '@ionic-native/admob-free';

import { MyApp } from './app.component';
import { GroupSelectorPage } from '../pages/group-selector/group-selector';
import { GroupPage } from '../pages/group/group';
import { SettingsGroupPage } from '../pages/settings-group/settings-group';
import { TimerGroupPage } from '../pages/timer-group/timer-group';
import { TimerPerMemberPage } from '../pages/timer-per-member/timer-per-member';
import { GrupoProvider } from '../providers/grupo/grupo';
import { ButtonAddMemberPage } from '../pages/button-add-member/button-add-member';
import { MembroProvider } from '../providers/grupo/membro';
import { ButtonSharedPage } from '../pages/button-shared/button-shared';

@NgModule({
  declarations: [
    MyApp,
    GroupSelectorPage,
    GroupPage,
    SettingsGroupPage,
    TimerGroupPage,
    TimerPerMemberPage,
    ButtonAddMemberPage,
    ButtonSharedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GroupSelectorPage,
    GroupPage,
    SettingsGroupPage,
    TimerGroupPage,
    TimerPerMemberPage,
     ButtonAddMemberPage,
    ButtonSharedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatePipe,
    GrupoProvider,
    MembroProvider,
    SocialSharing,
    Insomnia,
    AdMobFree
  ]
})
export class AppModule {}

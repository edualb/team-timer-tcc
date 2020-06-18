import { DatePipe } from '@angular/common';
import { ErrorHandler, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdMobFree } from '@ionic-native/admob-free';
import { Insomnia } from '@ionic-native/insomnia';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ButtonAddMemberPage } from '../pages/button-add-member/button-add-member';
import { ButtonSharedPage } from '../pages/button-shared/button-shared';
import { GroupSelectorPage } from '../pages/group-selector/group-selector';
import { GroupPage } from '../pages/group/group';
import { SettingsGroupPage } from '../pages/settings-group/settings-group';
import { TimerGroupPage } from '../pages/timer-group/timer-group';
import { TimerPerMemberPage } from '../pages/timer-per-member/timer-per-member';
import { DailyMeetingMainProvider } from '../providers/daily-meeting/daily-meeting-main';
import { DailyMeetingMemberProvider } from '../providers/daily-meeting/daily-meeting-member';
import { DailyMeetingSharingMessageProvider } from '../providers/daily-meeting/daily-meeting-sharing';
import { DailyMeetingWaitingProvider } from '../providers/daily-meeting/daily-meeting-waiting';
import { DailyMeetingMain } from '../providers/daily-meeting/interfaces/daily-meeting-main.interface';
import { DailyMeetingMember } from '../providers/daily-meeting/interfaces/daily-meeting-member.interface';
import { GrupoProvider } from '../providers/grupo/grupo';
import { MembroProvider } from '../providers/grupo/membro';
import { MyApp } from './app.component';


const DMMainInterfaceToken = new InjectionToken<DailyMeetingMain>('DailyMeetingMain');
const DMMemberInterfaceToken = new InjectionToken<DailyMeetingMember>('DailyMeetingMember');
const DMSharingInterfaceToken = new InjectionToken<DailyMeetingMember>('DailyMeetingSharing');

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
    {provide: 'DailyMeetingMember', useClass: DailyMeetingMemberProvider },
    {provide: 'DMMainInterfaceToken', useClass: DailyMeetingMainProvider, multi: true },
    {provide: 'DMMainInterfaceToken', useClass: DailyMeetingWaitingProvider, multi: true },
    {provide: 'DailyMeetingSharing', useClass: DailyMeetingSharingMessageProvider },
    SocialSharing,
    Insomnia,
    AdMobFree
  ]
})
export class AppModule {}

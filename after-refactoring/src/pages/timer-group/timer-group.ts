import { Component, Inject } from '@angular/core';
import { Insomnia } from '@ionic-native/insomnia';
import { NavParams, Platform } from 'ionic-angular';
import { DailyMeetingMain } from '../../providers/daily-meeting/interfaces/daily-meeting-main.interface';
import { DailyMeetingMember } from '../../providers/daily-meeting/interfaces/daily-meeting-member.interface';
import { DailyMeetingSharing } from '../../providers/daily-meeting/interfaces/daily-meeting-sharing.interface';
import { GrupoProvider } from '../../providers/grupo/grupo';

@Component({
  selector: 'page-timer-group',
  templateUrl: 'timer-group.html',
})
export class TimerGroupPage{

    title: string;
    timeLimit: string;
    timeLimitNumber: number;
    key: string;

    firstAccessDailyMeeting = true;
    endDailyMeeting = false;
    stopTimer = false;

    DMWaitingProvider: DailyMeetingMain;
    DMMainProvider: DailyMeetingMain

    constructor(
        public navParams: NavParams,
        private grupoProvider: GrupoProvider,
        @Inject('DailyMeetingSharing') public DMSharingProvider: DailyMeetingSharing,
        @Inject('DailyMeetingMember') public DMMemberProvider: DailyMeetingMember,
        @Inject('DMMainInterfaceToken') DailyMeetingMain: DailyMeetingMain[],
        private insomnia: Insomnia,
        private platform: Platform) {
            this.DMMainProvider = DailyMeetingMain[0];
            this.DMWaitingProvider = DailyMeetingMain[1];

            this.DMSharingProvider.share.members = [];
            this.DMMemberProvider.drawMembers = [];

            this.DMMemberProvider.clearTimerInterval();
            this.DMMemberProvider.resetTimer();

            this.DMWaitingProvider.clearTimerInterval();
            this.DMWaitingProvider.resetTimer();

            this.DMMainProvider.clearTimerInterval();
            this.DMMainProvider.resetTimer();
    }

    ionViewWillEnter() {
        this.key = this.navParams.get('groupKey');
        this.grupoProvider.getGrupo(this.key).then((group) => {
            this.title = group.titulo;
            this.timeLimit = group.tempoLimite
            this.DMMemberProvider.drawingMembers(group.membros)

            this.timeLimitNumber =  this.getTimeLimit();
        });

        if (this.platform.is('cordova')) {
            this.insomnia.keepAwake().then(() => {
                console.log('success'),
                console.log('error')
            });
        }
    }

    nextMember() {
        if (!this.firstAccessDailyMeeting) {
            let lastTime = this.DMMemberProvider.getTimeFormat();
            this.DMMemberProvider.resetTimer();

            if (this.DMMemberProvider.drawMembers.length === 1) {
                this.stopDailyMeeting(lastTime);
            } else {
                this.playDailyMeeting(lastTime);
            }

        } else {
            this.initTimerDailyMeeting();
            this.firstAccessDailyMeeting = false;
        }
    }

    playDailyMeeting(time: string) {
        this.DMSharingProvider.setTimeMembers(time, this.DMMemberProvider.drawMembers[0]);
        this.DMMemberProvider.drawMembers.splice(0, 1);
        this.DMMemberProvider.clearTimerInterval()
        this.DMMemberProvider.initTimerInterval(this.timeLimitNumber);
    }

    stopDailyMeeting(time: string) {
        this.DMSharingProvider.setTimeMembers(time, this.DMMemberProvider.drawMembers[0]);
        this.DMMemberProvider.drawMembers.splice(0, 1);
        this.stopTimerDailyMeeting();
        this.buildMessage();
        this.endDailyMeeting = true;
        console.log(this.DMSharingProvider.share.message);
    }
    
    initTimerDailyMeeting() {
        this.stopTimer = false;
        this.DMWaitingProvider.clearTimerInterval();
        this.DMMemberProvider.initTimerInterval(this.timeLimitNumber);
        this.DMMainProvider.initTimerInterval();
    }

    stopTimerDailyMeeting() {
        this.stopTimer = true;
        this.DMWaitingProvider.initTimerInterval();
        this.DMMemberProvider.clearTimerInterval();
        this.DMMainProvider.clearTimerInterval();
    }

    private buildMessage() {
        this.DMSharingProvider.setMembersAndTime();

        this.DMSharingProvider.share.title = this.title;
        this.DMSharingProvider.share.timeWaited = this.DMWaitingProvider.getTimeFormat();
        this.DMSharingProvider.share.standupTime = this.DMMainProvider.getTimeFormat();
        this.DMSharingProvider.share.timeLimit = this.timeLimit;
        this.DMSharingProvider.buildMessage();
    }

    private getTimeLimit() {
        let secondLimit: number = parseInt(this.timeLimit.substring(6, 8));
        let minuteLimit: number = parseInt(this.timeLimit.substring(3, 5)) * 60;
        let hourLimit: number = parseInt(this.timeLimit.substring(0, 2)) * 3600;
        return hourLimit + minuteLimit + secondLimit;
    }

}

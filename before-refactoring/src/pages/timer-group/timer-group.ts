import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Grupo } from '../../contents/Grupo';
import { GrupoProvider } from '../../providers/grupo/grupo';
import { Membro } from '../../contents/membro';
import { MembroProvider } from '../../providers/grupo/membro';
import { Insomnia } from '@ionic-native/insomnia';

@Component({
  selector: 'page-timer-group',
  templateUrl: 'timer-group.html',
})
export class TimerGroupPage{

    grupo: Grupo;
    tempoLimite: number;
    key: string;

    membrosSorteados: Membro[] = [];
    tempoMembros: Membro[] = [];

    primeiroAcesso = true;
    fimDailyMeeting = false;
    stopTimer = false;

    timerMember: any; // TODO: criar component Timer
    timerSegura: any; // TODO: criar component Timer
    timer: any; // TODO: criar component Timer

    mensagemCompartilhada: string;

    // TODO: criar component Timer (Inicio Timer Component)
    horaMembro: string = '00';
    minutoMembro: string = '00';
    segundoMembro: string = '00';
    horaSegura: string = '00';
    minutoSegura: string = '00';
    segundoSegura: string = '00';
    hora: string = '00';
    minuto: string = '00';
    segundo: string = '00';

    horaUpMembro = 0;
    minutoUpMembro = 0;
    segundoUpMembro = 0;
    horaUpSegura = 0;
    minutoUpSegura = 0;
    segundoUpSegura = 0;
    horaUp = 0;
    minutoUp = 0;
    segundoUp = 0;
    // TODO: criar component Timer (Fim Timer Component)

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private grupoProvider: GrupoProvider,
                private membroProvider: MembroProvider,
                private insomnia: Insomnia,
                private platform: Platform) {
    }

    ionViewWillEnter() {
        this.key = this.navParams.get('groupKey');
        this.grupoProvider.getGrupo(this.key).then((result) => {
            this.grupo = result;
            this.membroProvider.sortearMembros(this.grupo.membros, this.membrosSorteados);

            let segundoLimite: number = parseInt(this.grupo.tempoLimite.substring(6, 8));
            let minutoLimite: number = parseInt(this.grupo.tempoLimite.substring(3, 5));
            let horaLimite: number = parseInt(this.grupo.tempoLimite.substring(0, 2));
    
            this.tempoLimite = this.calculaTempoDecimal(horaLimite, minutoLimite, segundoLimite);
        });

        if (this.platform.is('cordova')) {
            this.insomnia.keepAwake().then(() => {
                console.log('success'),
                console.log('error')
            });
        }
    }

    calculaTempoDecimal(hora: number, minuto: number, segundo: number) {
        let minutoSegundo: number = minuto * 60;
        let horaSegundo: number = hora * 3600;

        return horaSegundo + minutoSegundo + segundo;
    }

    proximoMembro() {
        if (!this.primeiroAcesso) {
            let ultimoTempo = this.horaMembro + ':' + this.minutoMembro + ':' + this.segundoMembro;
            this.zeraTempo();

            if (this.membrosSorteados.length === 1) {
                this.paraDailyMeeting(ultimoTempo);
            } else {
                this.continuaDailyMeeting(ultimoTempo);
            }

        } else {
            this.iniciarContagem();
            this.primeiroAcesso = false;
        }
    }

    pulaMembro() {
        this.membroProvider.pularMembro(this.membrosSorteados);
        this.resetaTimer();
        this.zeraTempo();
    }

    continuaDailyMeeting(tempo: string) {
        this.prepararTempoMembros(tempo);
        this.membrosSorteados.splice(0, 1);
        this.resetaTimer();
    }

    paraDailyMeeting(tempo: string) {
        this.prepararTempoMembros(tempo);
        this.membrosSorteados.splice(0, 1);
        this.pararContagem();
        this.mensagemCompartilhada = 'Group: ' + this.grupo.titulo + '\n' 
                                    + 'Suggested time per member: ' + this.grupo.tempoLimite + '\n'
                                    + 'Standup time: ' + this.hora + ':' + this.minuto + ':' + this.segundo + '\n'
                                    + 'Time on hold: ' + this.horaSegura + ':' + this.minutoSegura + ':' + this.segundoSegura + '\n'
                                    + this.membroProvider.getMembrosETempo(this.tempoMembros);
        this.fimDailyMeeting = true;
        console.log(this.mensagemCompartilhada);
    }

    prepararTempoMembros(tempo: string) {
        this.tempoMembros.push({
            id: this.membrosSorteados[0].id,
            nome: this.membrosSorteados[0].nome,
            tempo: tempo,
            presenca: this.membrosSorteados[0].presenca,
            passouTempoSugerido: this.membrosSorteados[0].passouTempoSugerido
        });
    }

    // TODO: criar component Timer (Inicio Timer Component)
    upTimeMember() {
        let tempoMemberLimite: number = this.calculaTempoDecimal(this.horaUpMembro, this.minutoUpMembro, this.segundoUpMembro);

        if (this.segundoUpMembro == 59) {
            if (this.minutoUpMembro == 59) {
                this.horaUpMembro++;
                this.minutoUpMembro = 0;
            } else this.minutoUpMembro++;
            this.segundoUpMembro = 0;
        } else this.segundoUpMembro++;

        if (tempoMemberLimite >= this.tempoLimite) {
            this.membrosSorteados[0].passouTempoSugerido = true;
        }

        this.horaMembro = this.timeToString(this.horaUpMembro);
        this.minutoMembro = this.timeToString(this.minutoUpMembro);
        this.segundoMembro = this.timeToString(this.segundoUpMembro);

    }

    upTimeSegura() {
        if (this.segundoUpSegura == 59) {
            if (this.minutoUpSegura == 59) {
                this.horaUpSegura++;
                this.minutoUpSegura = 0;
            } else this.minutoUpSegura++;
            this.segundoUpSegura = 0;
        } else this.segundoUpSegura++;

        this.horaSegura = this.timeToString(this.horaUpSegura);
        this.minutoSegura = this.timeToString(this.minutoUpSegura);
        this.segundoSegura = this.timeToString(this.segundoUpSegura);

    }

    upTime() {
        if (this.segundoUp == 59) {
            if (this.minutoUp == 59) {
                this.horaUp++;
                this.minutoUp = 0;
            } else this.minutoUp++;
            this.segundoUp = 0;
        } else this.segundoUp++;

        this.hora = this.timeToString(this.horaUp);
        this.minuto = this.timeToString(this.minutoUp);
        this.segundo = this.timeToString(this.segundoUp);

    }

    timeToString(timeNumber: number): string {
        if (timeNumber < 10) {
            return '0' + timeNumber.toString();
        }
        return timeNumber.toString();
    }

    zeraTempo() {
        this.horaMembro = '00';
        this.minutoMembro = '00';
        this.segundoMembro = '00';
        this.horaUpMembro = 0;
        this.minutoUpMembro = 0;
        this.segundoUpMembro = 0;
    }

    resetaTimer() {
        clearInterval(this.timerMember);
        this.timerMember = setInterval(() => this.upTimeMember(), 1000);
    }
    
    iniciarContagem() {
        this.stopTimer = false;
        clearInterval(this.timerSegura);
        this.timerMember = setInterval(() => this.upTimeMember(), 1000);
        this.timer = setInterval(() => this.upTime(), 1000);
    }

    pararContagem() {
        this.stopTimer = true;
        this.timerSegura = setInterval(() => this.upTimeSegura(), 1000);
        clearInterval(this.timerMember);
        clearInterval(this.timer);
    }
    // TODO: criar component Timer (Fim Timer Component)
}

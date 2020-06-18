webpackJsonp([0],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsGroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contents_Grupo__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_grupo_grupo__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_grupo_membro__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SettingsGroupPage = /** @class */ (function () {
    function SettingsGroupPage(navCtrl, navParams, grupoProvider, toast, membroProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.grupoProvider = grupoProvider;
        this.toast = toast;
        this.membroProvider = membroProvider;
        this.nomeGrupoInput = '';
        this.tempoGrupo = '00:00:00';
        this.membros = [];
    }
    SettingsGroupPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.novoGrupo = this.navParams.get('novoGrupo');
        if (!this.novoGrupo) {
            this.key = this.navParams.get('groupKey');
            this.grupoProvider.getGrupo(this.key).then(function (result) {
                _this.grupo = result;
                _this.nomeGrupoInput = _this.grupo.titulo;
                _this.tempoGrupo = _this.grupo.tempoLimite;
            });
        }
    };
    SettingsGroupPage.prototype.criarNovoGrupo = function () {
        var _this = this;
        this.inserirTempoNosMembros(this.tempoGrupo);
        this.grupo = new __WEBPACK_IMPORTED_MODULE_2__contents_Grupo__["a" /* Grupo */](this.nomeGrupoInput, this.membros, this.tempoGrupo);
        return this.grupoProvider.insert(this.grupo)
            .then(function () {
            _this.toast.create({
                message: 'Grupo Criado',
                duration: 2000,
                position: 'top'
            }).present();
            _this.navCtrl.pop();
        })
            .catch(function () {
            _this.toast.create({
                message: 'Erro ao criar novo grupo',
                duration: 3000,
                position: 'top'
            }).present();
        });
    };
    SettingsGroupPage.prototype.inserirTempoNosMembros = function (tempo) {
        this.membros.forEach(function (membro) {
            membro.tempo = tempo;
        });
    };
    SettingsGroupPage.prototype.addMembro = function (membro) {
        this.membros.push(membro);
    };
    SettingsGroupPage.prototype.saveGrupo = function () {
        this.grupo.titulo = this.nomeGrupoInput;
        this.grupo.tempoLimite = this.tempoGrupo;
        this.inserirTempoNosMembros(this.grupo.tempoLimite);
        this.grupoProvider.update(this.key, this.grupo);
        this.navCtrl.pop();
    };
    SettingsGroupPage.prototype.deletaGrupo = function () {
        this.grupoProvider.remove(this.key);
        this.navCtrl.popToRoot();
    };
    SettingsGroupPage.prototype.deletaMembro = function (membro) {
        this.membroProvider.deletaMembro(membro, this.membros);
    };
    SettingsGroupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings-group',template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer/src/pages/settings-group/settings-group.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title *ngIf="!novoGrupo">{{ grupo?.titulo }} SETTINGS</ion-title>\n        <ion-title *ngIf="novoGrupo">NEW GROUP</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding class="background-default">\n    <ion-list>\n        <ion-item color="background-default">\n            <ion-label color="primary">Group name</ion-label>\n            <ion-input placeholder="Group name Input" [(ngModel)]="nomeGrupoInput"></ion-input>\n        </ion-item>\n        <br/>\n        <ion-item color="background-default">\n            <ion-label color="primary">Time per member</ion-label>\n            <ion-datetime displayFormat="HH:mm:ss" [(ngModel)]="tempoGrupo"></ion-datetime>\n        </ion-item>\n        <br/>\n        <h2 ion-text color="primary" *ngIf="novoGrupo">Members:</h2>\n        <ion-item color="background-default" class="texto" *ngFor="let membro of membros">\n                <ion-label>{{ membro?.nome }}</ion-label>\n                <button item-end ion-button icon-only clear="true" (click)="deletaMembro(membro)">\n                    <ion-icon class="icon ion-md-trash ion-ios-trash"></ion-icon>\n                </button>\n        </ion-item>\n        <br/>\n        <ion-item color="background-default" class="texto" *ngIf="novoGrupo">\n            <page-button-add-member [id]="membros.length + 1" [tempo]="tempoGrupo" (respostaMembros)="addMembro($event)"></page-button-add-member>\n        </ion-item>\n    </ion-list>\n</ion-content>\n<ion-footer>\n    <ion-toolbar>\n    <button ion-button icon-start full large="true" *ngIf="!novoGrupo" (click)="saveGrupo()">\n        <ion-icon class="icon ion-md-checkmark ion-ios-checkmark"></ion-icon>\n        Save Settings\n    </button>\n    <button ion-button icon-start full color="danger" large="true" (click)="deletaGrupo()"\n        *ngIf="!novoGrupo">\n        <ion-icon class="icon ion-md-trash ion-ios-trash"></ion-icon>\n        Delete group\n    </button>\n    <button ion-button icon-start full large="true" \n        *ngIf="novoGrupo" (click)="criarNovoGrupo()">\n            <ion-icon class="icon ion-md-add-circle ion-ios-add-circle"></ion-icon>\n            Create new group\n    </button>\n    </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer/src/pages/settings-group/settings-group.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_grupo_grupo__["a" /* GrupoProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_grupo_membro__["a" /* MembroProvider */]])
    ], SettingsGroupPage);
    return SettingsGroupPage;
}());

//# sourceMappingURL=settings-group.js.map

/***/ }),

/***/ 113:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 154;

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupSelectorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group_group__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_group_settings_group__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_grupo_grupo__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GroupSelectorPage = /** @class */ (function () {
    function GroupSelectorPage(navCtrl, navParams, grupoProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.grupoProvider = grupoProvider;
        this.nomeGrupo = 'Grupo Bndes';
        this.grupos = [];
    }
    GroupSelectorPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.grupoProvider.getAll().then(function (grupos) {
            _this.grupos = grupos;
        });
    };
    GroupSelectorPage.prototype.vaiParaGroup = function (key) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__group_group__["a" /* GroupPage */], {
            groupKey: key
        });
    };
    GroupSelectorPage.prototype.adicionarGrupo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__settings_group_settings_group__["a" /* SettingsGroupPage */], {
            nome: '',
            tempoGrupo: '00:00:00',
            novoGrupo: true
        });
    };
    GroupSelectorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-group-selector',template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer/src/pages/group-selector/group-selector.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title text-center>Group Selector</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding class="background-default">\n    <ion-row *ngFor="let lista of grupos">\n        <ion-col>\n        <button ion-button block outline icon-start large="true" (click)="vaiParaGroup(lista.key)">\n            <ion-icon class="ion-md-people ion-ios-people"></ion-icon>\n            {{ lista?.grupo?.titulo }}\n        </button>\n        </ion-col>\n    </ion-row>\n    <ion-row *ngIf="grupos.length == 0">\n        <ion-col>\n        <ion-fab center>\n            <button ion-fab (click)="adicionarGrupo()">\n            <ion-icon class="ion-md-add ion-ios-add"></ion-icon>\n            </button>\n        </ion-fab>\n        </ion-col>\n    </ion-row>\n</ion-content>\n<ion-footer>\n    <ion-toolbar>\n        <ion-fab id="top-zero" center *ngIf="grupos.length > 0">\n            <button ion-fab (click)="adicionarGrupo()">\n            <ion-icon class="ion-md-add ion-ios-add"></ion-icon>\n            </button>\n        </ion-fab>\n    </ion-toolbar>\n</ion-footer>\n\n'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer/src/pages/group-selector/group-selector.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_grupo_grupo__["a" /* GrupoProvider */]])
    ], GroupSelectorPage);
    return GroupSelectorPage;
}());

//# sourceMappingURL=group-selector.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_group_settings_group__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__timer_group_timer_group__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_grupo_grupo__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_grupo_membro__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_insomnia__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var GroupPage = /** @class */ (function () {
    function GroupPage(navCtrl, navParams, grupoProvider, membroProvider, insomnia) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.grupoProvider = grupoProvider;
        this.membroProvider = membroProvider;
        this.insomnia = insomnia;
        this.nome = true;
    }
    GroupPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.key = this.navParams.get('groupKey');
        this.grupoProvider.getGrupo(this.key).then(function (result) {
            _this.grupo = result;
            _this.possuiPresencaMembros(_this.grupo);
        });
        this.insomnia.allowSleepAgain().then(function () {
            console.log('success'),
                console.log('error');
        });
    };
    GroupPage.prototype.vaiParaSettingsGroup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__settings_group_settings_group__["a" /* SettingsGroupPage */], {
            groupKey: this.key,
            novoGrupo: false
        });
    };
    GroupPage.prototype.vaiParaTimer = function () {
        this.grupoProvider.update(this.key, this.grupo);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__timer_group_timer_group__["a" /* TimerGroupPage */], {
            groupKey: this.key
        });
    };
    GroupPage.prototype.addMembro = function (membro) {
        this.grupo.membros.push(membro);
        this.grupoProvider.update(this.key, this.grupo);
    };
    GroupPage.prototype.deletaMembro = function (membro) {
        this.membroProvider.deletaMembro(membro, this.grupo.membros);
    };
    GroupPage.prototype.possuiPresencaMembros = function (grupo) {
        var countMembers = 0;
        this.grupoProvider.update(this.key, grupo);
        grupo.membros.forEach(function (element) {
            if (element.presenca === true) {
                countMembers++;
            }
        });
        this.faltouTodosMembros = countMembers === 0;
    };
    GroupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-group',template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer/src/pages/group/group.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n        {{ grupo?.titulo }}\n    </ion-title>\n    <ion-buttons end>\n        <button ion-button icon-only (click)="vaiParaSettingsGroup()">\n            <ion-icon class="ion-md-settings ion-ios-settings"></ion-icon>\n        </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="background-default">\n    <ion-row>\n        <ion-col>\n            <button ion-button full icon-start large="true" \n                (click)="vaiParaTimer()" [disabled]="grupo?.membros.length === 0 || faltouTodosMembros">\n                <ion-icon class="icon ion-md-timer ion-ios-timer"></ion-icon>\n                START TIMER\n            </button>\n        </ion-col>\n    </ion-row>\n    <ion-list *ngIf="grupo">\n        <ion-item color="background-default" class="texto"\n            *ngFor="let membro of grupo.membros">\n                <ion-label>{{ membro?.nome }}</ion-label>\n                <ion-checkbox [(ngModel)]="membro.presenca" (click)="possuiPresencaMembros(grupo)"></ion-checkbox>\n                <button item-end ion-button icon-only clear="true" (click)="deletaMembro(membro)">\n                    <ion-icon class="icon ion-md-trash ion-ios-trash"></ion-icon>\n                </button>\n        </ion-item>\n        <br/>\n        <ion-item color="background-default" class="texto">\n            <page-button-add-member [id]="grupo.membros.length + 1" [tempo]="grupo.tempoLimite" (respostaMembros)="addMembro($event)"></page-button-add-member>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer/src/pages/group/group.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_grupo_grupo__["a" /* GrupoProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_grupo_membro__["a" /* MembroProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_insomnia__["a" /* Insomnia */]])
    ], GroupPage);
    return GroupPage;
}());

//# sourceMappingURL=group.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimerGroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_grupo_grupo__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_grupo_membro__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_insomnia__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TimerGroupPage = /** @class */ (function () {
    // TODO: criar component Timer (Fim Timer Component)
    function TimerGroupPage(navCtrl, navParams, grupoProvider, membroProvider, insomnia) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.grupoProvider = grupoProvider;
        this.membroProvider = membroProvider;
        this.insomnia = insomnia;
        this.membrosSorteados = [];
        this.tempoMembros = [];
        this.primeiroAcesso = true;
        this.fimDailyMeeting = false;
        this.stopTimer = false;
        // TODO: criar component Timer (Inicio Timer Component)
        this.horaMembro = '00';
        this.minutoMembro = '00';
        this.segundoMembro = '00';
        this.horaSegura = '00';
        this.minutoSegura = '00';
        this.segundoSegura = '00';
        this.hora = '00';
        this.minuto = '00';
        this.segundo = '00';
        this.horaUpMembro = 0;
        this.minutoUpMembro = 0;
        this.segundoUpMembro = 0;
        this.horaUpSegura = 0;
        this.minutoUpSegura = 0;
        this.segundoUpSegura = 0;
        this.horaUp = 0;
        this.minutoUp = 0;
        this.segundoUp = 0;
    }
    TimerGroupPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.key = this.navParams.get('groupKey');
        this.grupoProvider.getGrupo(this.key).then(function (result) {
            _this.grupo = result;
            _this.membroProvider.sortearMembros(_this.grupo.membros, _this.membrosSorteados);
            var segundoLimite = parseInt(_this.grupo.tempoLimite.substring(6, 8));
            var minutoLimite = parseInt(_this.grupo.tempoLimite.substring(3, 5));
            var horaLimite = parseInt(_this.grupo.tempoLimite.substring(0, 2));
            _this.tempoLimite = _this.calculaTempoDecimal(horaLimite, minutoLimite, segundoLimite);
        });
        this.insomnia.keepAwake().then(function () {
            console.log('success'),
                console.log('error');
        });
    };
    TimerGroupPage.prototype.calculaTempoDecimal = function (hora, minuto, segundo) {
        var minutoSegundo = minuto * 60;
        var horaSegundo = hora * 3600;
        return horaSegundo + minutoSegundo + segundo;
    };
    TimerGroupPage.prototype.proximoMembro = function () {
        if (!this.primeiroAcesso) {
            var ultimoTempo = this.horaMembro + ':' + this.minutoMembro + ':' + this.segundoMembro;
            this.zeraTempo();
            if (this.membrosSorteados.length === 1) {
                this.paraDailyMeeting(ultimoTempo);
            }
            else {
                this.continuaDailyMeeting(ultimoTempo);
            }
        }
        else {
            this.iniciarContagem();
            this.primeiroAcesso = false;
        }
    };
    TimerGroupPage.prototype.pulaMembro = function () {
        this.membroProvider.pularMembro(this.membrosSorteados);
        this.resetaTimer();
        this.zeraTempo();
    };
    TimerGroupPage.prototype.continuaDailyMeeting = function (tempo) {
        this.prepararTempoMembros(tempo);
        this.membrosSorteados.splice(0, 1);
        this.resetaTimer();
    };
    TimerGroupPage.prototype.paraDailyMeeting = function (tempo) {
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
    };
    TimerGroupPage.prototype.prepararTempoMembros = function (tempo) {
        this.tempoMembros.push({
            id: this.membrosSorteados[0].id,
            nome: this.membrosSorteados[0].nome,
            tempo: tempo,
            presenca: this.membrosSorteados[0].presenca,
            passouTempoSugerido: this.membrosSorteados[0].passouTempoSugerido
        });
    };
    // TODO: criar component Timer (Inicio Timer Component)
    TimerGroupPage.prototype.upTimeMember = function () {
        var tempoMemberLimite = this.calculaTempoDecimal(this.horaUpMembro, this.minutoUpMembro, this.segundoUpMembro);
        if (this.segundoUpMembro == 59) {
            if (this.minutoUpMembro == 59) {
                this.horaUpMembro++;
                this.minutoUpMembro = 0;
            }
            else
                this.minutoUpMembro++;
            this.segundoUpMembro = 0;
        }
        else
            this.segundoUpMembro++;
        if (tempoMemberLimite >= this.tempoLimite) {
            this.membrosSorteados[0].passouTempoSugerido = true;
        }
        this.horaMembro = this.timeToString(this.horaUpMembro);
        this.minutoMembro = this.timeToString(this.minutoUpMembro);
        this.segundoMembro = this.timeToString(this.segundoUpMembro);
    };
    TimerGroupPage.prototype.upTimeSegura = function () {
        if (this.segundoUpSegura == 59) {
            if (this.minutoUpSegura == 59) {
                this.horaUpSegura++;
                this.minutoUpSegura = 0;
            }
            else
                this.minutoUpSegura++;
            this.segundoUpSegura = 0;
        }
        else
            this.segundoUpSegura++;
        this.horaSegura = this.timeToString(this.horaUpSegura);
        this.minutoSegura = this.timeToString(this.minutoUpSegura);
        this.segundoSegura = this.timeToString(this.segundoUpSegura);
    };
    TimerGroupPage.prototype.upTime = function () {
        if (this.segundoUp == 59) {
            if (this.minutoUp == 59) {
                this.horaUp++;
                this.minutoUp = 0;
            }
            else
                this.minutoUp++;
            this.segundoUp = 0;
        }
        else
            this.segundoUp++;
        this.hora = this.timeToString(this.horaUp);
        this.minuto = this.timeToString(this.minutoUp);
        this.segundo = this.timeToString(this.segundoUp);
    };
    TimerGroupPage.prototype.timeToString = function (timeNumber) {
        if (timeNumber < 10) {
            return '0' + timeNumber.toString();
        }
        return timeNumber.toString();
    };
    TimerGroupPage.prototype.zeraTempo = function () {
        this.horaMembro = '00';
        this.minutoMembro = '00';
        this.segundoMembro = '00';
        this.horaUpMembro = 0;
        this.minutoUpMembro = 0;
        this.segundoUpMembro = 0;
    };
    TimerGroupPage.prototype.resetaTimer = function () {
        var _this = this;
        clearInterval(this.timerMember);
        this.timerMember = setInterval(function () { return _this.upTimeMember(); }, 1000);
    };
    TimerGroupPage.prototype.iniciarContagem = function () {
        var _this = this;
        this.stopTimer = false;
        clearInterval(this.timerSegura);
        this.timerMember = setInterval(function () { return _this.upTimeMember(); }, 1000);
        this.timer = setInterval(function () { return _this.upTime(); }, 1000);
    };
    TimerGroupPage.prototype.pararContagem = function () {
        var _this = this;
        this.stopTimer = true;
        this.timerSegura = setInterval(function () { return _this.upTimeSegura(); }, 1000);
        clearInterval(this.timerMember);
        clearInterval(this.timer);
    };
    TimerGroupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-timer-group',template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer/src/pages/timer-group/timer-group.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{ grupo?.titulo }} Timer</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding class="background-default">\n    <ion-grid *ngIf="!fimDailyMeeting">\n        <ion-row>\n            <ion-col size="2"></ion-col>\n            <ion-col size="8">\n                <h1 ion-text color="primary">\n                    {{ hora }}:{{ minuto }}:{{ segundo }}\n                </h1>\n            </ion-col>\n            <ion-col size="2"></ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col size="2"></ion-col>\n            <ion-col size="8">\n                <h2 ion-text color="pause" *ngIf="stopTimer || segundoSegura > 0">\n                    {{ horaSegura }}:{{ minutoSegura }}:{{ segundoSegura }}\n                </h2>\n            </ion-col>\n            <ion-col size="2"></ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col *ngIf="membrosSorteados[0]">\n                <h4 ion-text color="primary" [ngClass]="{\'passou-tempo-sugerido\': membrosSorteados[0].passouTempoSugerido}">\n                    {{ membrosSorteados[0].nome }} {{ horaMembro }}:{{ minutoMembro }}:{{ segundoMembro }}\n                </h4>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <h6 ion-text color="primary" class="segunda-posicao">\n                    {{ membrosSorteados[1]?.nome }}\n                </h6>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <h6 ion-text color="primary">\n                    {{ membrosSorteados[2]?.nome }}\n                </h6>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <h6 ion-text color="primary" class="ultima-posicao">\n                    {{ membrosSorteados[3]?.nome }}\n                </h6>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n    <page-timer-per-member [show]="fimDailyMeeting" [membros]="tempoMembros"></page-timer-per-member>\n</ion-content>\n<ion-footer>\n    <ion-toolbar>\n    <button ion-button icon-start full large="true" *ngIf="!fimDailyMeeting"\n        (click)="proximoMembro()" [disabled]="stopTimer">\n            <ion-icon class="icon ion-md-timer ion-ios-timer"></ion-icon>\n            {{ primeiroAcesso? \'Start Daily Meeting\' : \'Next member\' }}\n    </button>\n    <button ion-button icon-start full color="secondary" *ngIf="!fimDailyMeeting"\n        large="true" (click)="pulaMembro()" [disabled]="stopTimer || primeiroAcesso">\n            Move member to last\n    </button>\n    <button ion-button icon-start full color="pause" *ngIf="!stopTimer && !fimDailyMeeting"\n        large="true" (click)="pararContagem()" [disabled]="primeiroAcesso">\n            <ion-icon class="icon ion-md-pause ion-ios-pause"></ion-icon>\n            Pause timer\n    </button>\n    <button ion-button icon-start full *ngIf="stopTimer && !fimDailyMeeting"\n        large="true" (click)="iniciarContagem()">\n            <ion-icon class="icon ion-md-play ion-ios-play"></ion-icon>\n            Resume timer\n    </button>\n    <page-button-shared [msg]="mensagemCompartilhada" *ngIf="fimDailyMeeting"></page-button-shared>\n    </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer/src/pages/timer-group/timer-group.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_grupo_grupo__["a" /* GrupoProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_grupo_membro__["a" /* MembroProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_insomnia__["a" /* Insomnia */]])
    ], TimerGroupPage);
    return TimerGroupPage;
}());

//# sourceMappingURL=timer-group.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(227);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_insomnia__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_admob_free__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_group_selector_group_selector__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_group_group__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_settings_group_settings_group__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_timer_group_timer_group__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_timer_per_member_timer_per_member__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_grupo_grupo__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_button_add_member_button_add_member__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_grupo_membro__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_button_shared_button_shared__ = __webpack_require__(294);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_group_selector_group_selector__["a" /* GroupSelectorPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_group_group__["a" /* GroupPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_settings_group_settings_group__["a" /* SettingsGroupPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_timer_group_timer_group__["a" /* TimerGroupPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_timer_per_member_timer_per_member__["a" /* TimerPerMemberPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_button_add_member_button_add_member__["a" /* ButtonAddMemberPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_button_shared_button_shared__["a" /* ButtonSharedPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_group_selector_group_selector__["a" /* GroupSelectorPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_group_group__["a" /* GroupPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_settings_group_settings_group__["a" /* SettingsGroupPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_timer_group_timer_group__["a" /* TimerGroupPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_timer_per_member_timer_per_member__["a" /* TimerPerMemberPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_button_add_member_button_add_member__["a" /* ButtonAddMemberPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_button_shared_button_shared__["a" /* ButtonSharedPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_6__angular_common__["d" /* DatePipe */],
                __WEBPACK_IMPORTED_MODULE_16__providers_grupo_grupo__["a" /* GrupoProvider */],
                __WEBPACK_IMPORTED_MODULE_18__providers_grupo_membro__["a" /* MembroProvider */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_insomnia__["a" /* Insomnia */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_admob_free__["a" /* AdMobFree */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_group_selector_group_selector__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_admob_free__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, admobFree) {
        var _this = this;
        this.admobFree = admobFree;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_group_selector_group_selector__["a" /* GroupSelectorPage */];
        this.showSplash = true;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__["timer"])(2800).subscribe(function () { return _this.showSplash = false; });
            _this.showAd();
        });
    }
    // id: 'ca-app-pub-6885157862885221/6173898364' <- My ID
    MyApp.prototype.showAd = function () {
        var _this = this;
        var bannerConfig = {
            id: 'ca-app-pub-3940256099942544/6300978111',
            isTesting: false,
            autoShow: true
        };
        this.admobFree.banner.config(bannerConfig);
        this.admobFree.banner.prepare()
            .then(function () {
            _this.admobFree.banner.show();
        })
            .catch(function (e) { return console.log(e); });
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer/src/app/app.html"*/'<div *ngIf="showSplash" class="splash">\n    <div class="sk-folding-cube">\n        <div class="sk-cube1 sk-cube"></div>\n        <div class="sk-cube2 sk-cube"></div>\n        <div class="sk-cube4 sk-cube"></div>\n        <div class="sk-cube3 sk-cube"></div>\n    </div>\n</div>\n<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_admob_free__["a" /* AdMobFree */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Grupo; });
var Grupo = /** @class */ (function () {
    function Grupo(titulo, membros, tempoLimite) {
        this.titulo = titulo;
        this.membros = membros;
        this.tempoLimite = tempoLimite;
    }
    return Grupo;
}());

//# sourceMappingURL=Grupo.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GrupoList; });
var GrupoList = /** @class */ (function () {
    function GrupoList(key, grupo) {
        this.key = key;
        this.grupo = grupo;
    }
    return GrupoList;
}());

//# sourceMappingURL=Grupos.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimerPerMemberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TimerPerMemberPage = /** @class */ (function () {
    function TimerPerMemberPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    TimerPerMemberPage.prototype.ionViewDidLoad = function () {
        console.log(this.membros);
        console.log(this.show);
        console.log('ionViewDidLoad TimerPerMemberPage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], TimerPerMemberPage.prototype, "show", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], TimerPerMemberPage.prototype, "membros", void 0);
    TimerPerMemberPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-timer-per-member',template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer/src/pages/timer-per-member/timer-per-member.html"*/'<div *ngIf="show" >\n  <ion-grid *ngFor="let membro of membros">\n    <ion-row>\n        <ion-col>\n            <h6 ion-text color="primary">\n                {{ membro.nome }} ({{ membro.tempo }})\n            </h6>\n        </ion-col>\n    </ion-row>\n  </ion-grid>\n</div>\n'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer/src/pages/timer-per-member/timer-per-member.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], TimerPerMemberPage);
    return TimerPerMemberPage;
}());

//# sourceMappingURL=timer-per-member.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonAddMemberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contents_membro__ = __webpack_require__(293);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ButtonAddMemberPage = /** @class */ (function () {
    function ButtonAddMemberPage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.respostaMembros = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    ButtonAddMemberPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddMemberPage');
    };
    ButtonAddMemberPage.prototype.openAddMembro = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Add member',
            inputs: [
                {
                    name: 'nome',
                    placeholder: 'Member name'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        _this.membro = new __WEBPACK_IMPORTED_MODULE_2__contents_membro__["a" /* Membro */](_this.id, data.nome, _this.tempo);
                        _this.emiteMembro(_this.membro);
                    }
                }
            ]
        });
        alert.present();
    };
    ButtonAddMemberPage.prototype.emiteMembro = function (membro) {
        this.respostaMembros.emit(membro);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], ButtonAddMemberPage.prototype, "id", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ButtonAddMemberPage.prototype, "tempo", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], ButtonAddMemberPage.prototype, "respostaMembros", void 0);
    ButtonAddMemberPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-button-add-member',template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer/src/pages/button-add-member/button-add-member.html"*/'<button item-start ion-button block outline icon-only large="true" (click)="openAddMembro()">\n    <ion-icon item-start class="icon ion-md-person-add ion-ios-person-add"></ion-icon>\n    Add member\n</button>\n'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer/src/pages/button-add-member/button-add-member.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ButtonAddMemberPage);
    return ButtonAddMemberPage;
}());

//# sourceMappingURL=button-add-member.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Membro; });
var Membro = /** @class */ (function () {
    function Membro(id, nome, tempo) {
        this.id = id;
        this.nome = nome;
        this.tempo = tempo;
        this.presenca = true;
        this.passouTempoSugerido = false;
    }
    return Membro;
}());

//# sourceMappingURL=membro.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonSharedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_social_sharing__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ButtonSharedPage = /** @class */ (function () {
    function ButtonSharedPage(shareProvider) {
        this.shareProvider = shareProvider;
    }
    ButtonSharedPage.prototype.share = function () {
        this.shareProvider.share(this.msg).then(function () {
            console.log('success');
        }).catch(function () { return console.log('error'); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ButtonSharedPage.prototype, "msg", void 0);
    ButtonSharedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-button-shared',template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer/src/pages/button-shared/button-shared.html"*/'<button ion-button icon-start full color="secondary" large="true" (click)="share()">\n        <ion-icon class="icon ion-md-share ion-ios-share"></ion-icon>\n        Share Time\n</button>\n'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer/src/pages/button-shared/button-shared.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], ButtonSharedPage);
    return ButtonSharedPage;
}());

//# sourceMappingURL=button-shared.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GrupoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contents_Grupos__ = __webpack_require__(281);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GrupoProvider = /** @class */ (function () {
    function GrupoProvider(storage, datepipe) {
        this.storage = storage;
        this.datepipe = datepipe;
    }
    GrupoProvider.prototype.insert = function (grupo) {
        var key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
        return this.save(key, grupo);
    };
    GrupoProvider.prototype.update = function (key, grupo) {
        return this.save(key, grupo);
    };
    GrupoProvider.prototype.save = function (key, grupo) {
        return this.storage.set(key, grupo);
    };
    GrupoProvider.prototype.remove = function (key) {
        return this.storage.remove(key);
    };
    GrupoProvider.prototype.getGrupo = function (key) {
        return this.storage.get(key);
    };
    GrupoProvider.prototype.getAll = function () {
        var grupos = [];
        return this.storage.forEach(function (value, key, iterationNumber) {
            var grupo = new __WEBPACK_IMPORTED_MODULE_3__contents_Grupos__["a" /* GrupoList */](key, value);
            grupos.push(grupo);
        })
            .then(function () {
            return Promise.resolve(grupos);
        })
            .catch(function (error) {
            return Promise.reject(error);
        });
    };
    GrupoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__angular_common__["d" /* DatePipe */]])
    ], GrupoProvider);
    return GrupoProvider;
}());

//# sourceMappingURL=grupo.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MembroProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MembroProvider = /** @class */ (function () {
    function MembroProvider() {
    }
    MembroProvider.prototype.deletaMembro = function (membro, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === membro.id && array[i].nome === membro.nome) {
                array.splice(i, 1);
            }
        }
    };
    MembroProvider.prototype.sortearMembros = function (membros, membrosSorteados) {
        var membrosPresentes = [];
        this.getMembrosPresente(membros, membrosPresentes);
        var valorSorteado = Math.floor((Math.random() * membrosPresentes.length));
        membrosSorteados.push(membrosPresentes[valorSorteado]);
        for (var i = valorSorteado + 1; i < membrosPresentes.length; i++) {
            membrosSorteados.push(membrosPresentes[i]);
        }
        for (var i = 0; i < valorSorteado; i++) {
            membrosSorteados.push(membrosPresentes[i]);
        }
    };
    MembroProvider.prototype.pularMembro = function (membrosSorteados) {
        var elemento = membrosSorteados[0];
        membrosSorteados.splice(0, 1);
        membrosSorteados.splice(membrosSorteados.length, 0, elemento);
    };
    MembroProvider.prototype.getMembrosPresente = function (membros, membrosPresentes) {
        membros.forEach(function (element) {
            if (element.presenca === true) {
                membrosPresentes.push(element);
            }
        });
    };
    MembroProvider.prototype.getMembrosETempo = function (membros) {
        var membrosComTempo = '-----MEMBERS-----';
        membros.forEach(function (element) {
            if (element.passouTempoSugerido) {
                membrosComTempo += '\n' + '*' + element.nome + '(' + element.tempo + ')' + '*';
            }
            else {
                membrosComTempo += '\n' + element.nome + '(' + element.tempo + ')';
            }
        });
        return membrosComTempo.toString();
    };
    MembroProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], MembroProvider);
    return MembroProvider;
}());

//# sourceMappingURL=membro.js.map

/***/ })

},[204]);
//# sourceMappingURL=main.js.map
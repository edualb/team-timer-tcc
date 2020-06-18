webpackJsonp([0],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsGroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contents_Grupo__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_grupo_grupo__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_grupo_membro__ = __webpack_require__(106);
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
            selector: 'page-settings-group',template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/pages/settings-group/settings-group.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title *ngIf="!novoGrupo">{{ grupo?.titulo }} SETTINGS</ion-title>\n        <ion-title *ngIf="novoGrupo">NEW GROUP</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding class="background-default">\n    <ion-list>\n        <ion-item color="background-default">\n            <ion-label color="primary">Group name</ion-label>\n            <ion-input placeholder="Group name Input" [(ngModel)]="nomeGrupoInput"></ion-input>\n        </ion-item>\n        <br/>\n        <ion-item color="background-default">\n            <ion-label color="primary">Time per member</ion-label>\n            <ion-datetime displayFormat="HH:mm:ss" [(ngModel)]="tempoGrupo"></ion-datetime>\n        </ion-item>\n        <br/>\n        <h2 ion-text color="primary" *ngIf="novoGrupo">Members:</h2>\n        <ion-item color="background-default" class="texto" *ngFor="let membro of membros">\n                <ion-label>{{ membro?.nome }}</ion-label>\n                <button item-end ion-button icon-only clear="true" (click)="deletaMembro(membro)">\n                    <ion-icon class="icon ion-md-trash ion-ios-trash"></ion-icon>\n                </button>\n        </ion-item>\n        <br/>\n        <ion-item color="background-default" class="texto" *ngIf="novoGrupo">\n            <page-button-add-member [id]="membros.length + 1" [tempo]="tempoGrupo" (respostaMembros)="addMembro($event)"></page-button-add-member>\n        </ion-item>\n    </ion-list>\n</ion-content>\n<ion-footer>\n    <ion-toolbar>\n    <button ion-button icon-start full large="true" *ngIf="!novoGrupo" (click)="saveGrupo()">\n        <ion-icon class="icon ion-md-checkmark ion-ios-checkmark"></ion-icon>\n        Save Settings\n    </button>\n    <button ion-button icon-start full color="danger" large="true" (click)="deletaGrupo()"\n        *ngIf="!novoGrupo">\n        <ion-icon class="icon ion-md-trash ion-ios-trash"></ion-icon>\n        Delete group\n    </button>\n    <button ion-button icon-start full large="true" \n        *ngIf="novoGrupo" (click)="criarNovoGrupo()">\n            <ion-icon class="icon ion-md-add-circle ion-ios-add-circle"></ion-icon>\n            Create new group\n    </button>\n    </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/pages/settings-group/settings-group.html"*/,
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

/***/ 106:
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
    MembroProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], MembroProvider);
    return MembroProvider;
}());

//# sourceMappingURL=membro.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = AspectTime;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var aspectOptions = [
    {
        methods: ['getTimeFormat'],
        advice: 'before',
        func: function (target) {
            return target.hour + ':' + target.minute + ':' + target.second;
        }
    },
    {
        methods: ['resetTimer'],
        advice: 'before',
        func: function (target) {
            target.hour = '00';
            target.minute = '00';
            target.second = '00';
            target.hourNumber = 0;
            target.minuteNumber = 0;
            target.secondNumber = 0;
        }
    },
    {
        methods: ['updateTime'],
        advice: 'before',
        func: function (target) {
            timerCounting(target);
            convertTimeToString(target);
        }
    }
];
function AspectTime() {
    return function (target) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, args) || this;
                _this.hourNumber = 0;
                _this.minuteNumber = 0;
                _this.secondNumber = 0;
                _this.hour = '00';
                _this.minute = '00';
                _this.second = '00';
                for (var propertyName in _this) {
                    var propertyValue = _this[propertyName];
                    var isMethod = propertyValue instanceof Function;
                    if (!isMethod) {
                        continue;
                    }
                    var _loop_1 = function (aspect) {
                        var _loop_2 = function (method) {
                            if (method === propertyName) {
                                var descriptor = this_1.getMethodDescriptor(propertyName);
                                var originalMethod_1 = descriptor.value;
                                Object.defineProperty(this_1, method, {
                                    configurable: true,
                                    enumerable: true,
                                    writable: true,
                                    value: function () {
                                        if (aspect.advice === 'before') {
                                            var value = aspect.func(_this);
                                            if (value !== undefined) {
                                                return value;
                                            }
                                        }
                                        originalMethod_1.apply(_this, args);
                                        if (aspect.advice === 'after') {
                                            var value = aspect.func(_this);
                                            if (value !== undefined) {
                                                return value;
                                            }
                                        }
                                    }
                                });
                                return "break";
                            }
                        };
                        for (var _i = 0, _a = aspect.methods; _i < _a.length; _i++) {
                            var method = _a[_i];
                            var state_1 = _loop_2(method);
                            if (state_1 === "break")
                                break;
                        }
                    };
                    var this_1 = this;
                    for (var _a = 0, aspectOptions_1 = aspectOptions; _a < aspectOptions_1.length; _a++) {
                        var aspect = aspectOptions_1[_a];
                        _loop_1(aspect);
                    }
                }
                return _this;
            }
            class_1.prototype.getMethodDescriptor = function (propertyName) {
                if (this.hasOwnProperty(propertyName))
                    return Object.getOwnPropertyDescriptor(this, propertyName);
                return {
                    configurable: true,
                    enumerable: true,
                    writable: true,
                    value: this[propertyName]
                };
            };
            return class_1;
        }(target));
    };
}
function timerCounting(target) {
    if (target.secondNumber == 59) {
        if (target.minuteNumber == 59) {
            target.hourNumber++;
            target.minuteNumber = 0;
        }
        else
            target.minuteNumber++;
        target.secondNumber = 0;
    }
    else
        target.secondNumber++;
}
function convertTimeToString(target) {
    target.hour = setFormat(target.hourNumber);
    target.minute = setFormat(target.minuteNumber);
    target.second = setFormat(target.secondNumber);
}
function setFormat(timerNumber) {
    var firstValue = timerNumber < 10 ? '0' : '';
    return firstValue + timerNumber.toString();
}
//# sourceMappingURL=time.aspect.js.map

/***/ }),

/***/ 114:
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
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 162:
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
webpackEmptyAsyncContext.id = 162;

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupSelectorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group_group__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_group_settings_group__ = __webpack_require__(105);
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
            selector: 'page-group-selector',template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/pages/group-selector/group-selector.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title text-center>Group Selector</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding class="background-default">\n    <ion-row *ngFor="let lista of grupos">\n        <ion-col>\n        <button ion-button block outline icon-start large="true" (click)="vaiParaGroup(lista.key)">\n            <ion-icon class="ion-md-people ion-ios-people"></ion-icon>\n            {{ lista?.grupo?.titulo }}\n        </button>\n        </ion-col>\n    </ion-row>\n    <ion-row *ngIf="grupos.length == 0">\n        <ion-col>\n        <ion-fab center>\n            <button ion-fab (click)="adicionarGrupo()">\n            <ion-icon class="ion-md-add ion-ios-add"></ion-icon>\n            </button>\n        </ion-fab>\n        </ion-col>\n    </ion-row>\n</ion-content>\n<ion-footer>\n    <ion-toolbar>\n        <ion-fab id="top-zero" center *ngIf="grupos.length > 0">\n            <button ion-fab (click)="adicionarGrupo()">\n            <ion-icon class="ion-md-add ion-ios-add"></ion-icon>\n            </button>\n        </ion-fab>\n    </ion-toolbar>\n</ion-footer>\n\n'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/pages/group-selector/group-selector.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_grupo_grupo__["a" /* GrupoProvider */]])
    ], GroupSelectorPage);
    return GroupSelectorPage;
}());

//# sourceMappingURL=group-selector.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_group_settings_group__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__timer_group_timer_group__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_grupo_grupo__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_grupo_membro__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_insomnia__ = __webpack_require__(61);
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
    function GroupPage(navCtrl, navParams, grupoProvider, membroProvider, insomnia, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.grupoProvider = grupoProvider;
        this.membroProvider = membroProvider;
        this.insomnia = insomnia;
        this.platform = platform;
        this.nome = true;
    }
    GroupPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.key = this.navParams.get('groupKey');
        this.grupoProvider.getGrupo(this.key).then(function (result) {
            _this.grupo = result;
            _this.possuiPresencaMembros(_this.grupo);
        });
        if (this.platform.is('cordova')) {
            this.insomnia.allowSleepAgain().then(function () {
                console.log('success'),
                    console.log('error');
            });
        }
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
            selector: 'page-group',template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/pages/group/group.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n        {{ grupo?.titulo }}\n    </ion-title>\n    <ion-buttons end>\n        <button ion-button icon-only (click)="vaiParaSettingsGroup()">\n            <ion-icon class="ion-md-settings ion-ios-settings"></ion-icon>\n        </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="background-default">\n    <ion-row>\n        <ion-col>\n            <button ion-button full icon-start large="true" \n                (click)="vaiParaTimer()" [disabled]="grupo?.membros.length === 0 || faltouTodosMembros">\n                <ion-icon class="icon ion-md-timer ion-ios-timer"></ion-icon>\n                START TIMER\n            </button>\n        </ion-col>\n    </ion-row>\n    <ion-list *ngIf="grupo">\n        <ion-item color="background-default" class="texto"\n            *ngFor="let membro of grupo.membros">\n                <ion-label>{{ membro?.nome }}</ion-label>\n                <ion-checkbox [(ngModel)]="membro.presenca" (click)="possuiPresencaMembros(grupo)"></ion-checkbox>\n                <button item-end ion-button icon-only clear="true" (click)="deletaMembro(membro)">\n                    <ion-icon class="icon ion-md-trash ion-ios-trash"></ion-icon>\n                </button>\n        </ion-item>\n        <br/>\n        <ion-item color="background-default" class="texto">\n            <page-button-add-member [id]="grupo.membros.length + 1" [tempo]="grupo.tempoLimite" (respostaMembros)="addMembro($event)"></page-button-add-member>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/pages/group/group.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_grupo_grupo__["a" /* GrupoProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_grupo_membro__["a" /* MembroProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_insomnia__["a" /* Insomnia */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */]])
    ], GroupPage);
    return GroupPage;
}());

//# sourceMappingURL=group.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimerGroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_insomnia__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_grupo_grupo__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var TimerGroupPage = /** @class */ (function () {
    function TimerGroupPage(navParams, grupoProvider, DMSharingProvider, DMMemberProvider, DailyMeetingMain, insomnia, platform) {
        this.navParams = navParams;
        this.grupoProvider = grupoProvider;
        this.DMSharingProvider = DMSharingProvider;
        this.DMMemberProvider = DMMemberProvider;
        this.insomnia = insomnia;
        this.platform = platform;
        this.firstAccessDailyMeeting = true;
        this.endDailyMeeting = false;
        this.stopTimer = false;
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
    TimerGroupPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.key = this.navParams.get('groupKey');
        this.grupoProvider.getGrupo(this.key).then(function (group) {
            _this.title = group.titulo;
            _this.timeLimit = group.tempoLimite;
            _this.DMMemberProvider.drawingMembers(group.membros);
            _this.timeLimitNumber = _this.getTimeLimit();
        });
        if (this.platform.is('cordova')) {
            this.insomnia.keepAwake().then(function () {
                console.log('success'),
                    console.log('error');
            });
        }
    };
    TimerGroupPage.prototype.nextMember = function () {
        if (!this.firstAccessDailyMeeting) {
            var lastTime = this.DMMemberProvider.getTimeFormat();
            this.DMMemberProvider.resetTimer();
            if (this.DMMemberProvider.drawMembers.length === 1) {
                this.stopDailyMeeting(lastTime);
            }
            else {
                this.playDailyMeeting(lastTime);
            }
        }
        else {
            this.initTimerDailyMeeting();
            this.firstAccessDailyMeeting = false;
        }
    };
    TimerGroupPage.prototype.playDailyMeeting = function (time) {
        this.DMSharingProvider.setTimeMembers(time, this.DMMemberProvider.drawMembers[0]);
        this.DMMemberProvider.drawMembers.splice(0, 1);
        this.DMMemberProvider.clearTimerInterval();
        this.DMMemberProvider.initTimerInterval(this.timeLimitNumber);
    };
    TimerGroupPage.prototype.stopDailyMeeting = function (time) {
        this.DMSharingProvider.setTimeMembers(time, this.DMMemberProvider.drawMembers[0]);
        this.DMMemberProvider.drawMembers.splice(0, 1);
        this.stopTimerDailyMeeting();
        this.buildMessage();
        this.endDailyMeeting = true;
        console.log(this.DMSharingProvider.share.message);
    };
    TimerGroupPage.prototype.initTimerDailyMeeting = function () {
        this.stopTimer = false;
        this.DMWaitingProvider.clearTimerInterval();
        this.DMMemberProvider.initTimerInterval(this.timeLimitNumber);
        this.DMMainProvider.initTimerInterval();
    };
    TimerGroupPage.prototype.stopTimerDailyMeeting = function () {
        this.stopTimer = true;
        this.DMWaitingProvider.initTimerInterval();
        this.DMMemberProvider.clearTimerInterval();
        this.DMMainProvider.clearTimerInterval();
    };
    TimerGroupPage.prototype.buildMessage = function () {
        this.DMSharingProvider.setMembersAndTime();
        this.DMSharingProvider.share.title = this.title;
        this.DMSharingProvider.share.timeWaited = this.DMWaitingProvider.getTimeFormat();
        this.DMSharingProvider.share.standupTime = this.DMMainProvider.getTimeFormat();
        this.DMSharingProvider.share.timeLimit = this.timeLimit;
        this.DMSharingProvider.buildMessage();
    };
    TimerGroupPage.prototype.getTimeLimit = function () {
        var secondLimit = parseInt(this.timeLimit.substring(6, 8));
        var minuteLimit = parseInt(this.timeLimit.substring(3, 5)) * 60;
        var hourLimit = parseInt(this.timeLimit.substring(0, 2)) * 3600;
        return hourLimit + minuteLimit + secondLimit;
    };
    TimerGroupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-timer-group',template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/pages/timer-group/timer-group.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{ title }} Timer</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding class="background-default">\n    <ion-grid *ngIf="!endDailyMeeting">\n        <ion-row>\n            <ion-col size="2"></ion-col>\n            <ion-col size="8">\n                <h1 ion-text color="primary">\n                    {{ DMMainProvider?.hour }}:{{ DMMainProvider?.minute }}:{{ DMMainProvider?.second }}\n                </h1>\n            </ion-col>\n            <ion-col size="2"></ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col size="2"></ion-col>\n            <ion-col size="8">\n                <h2 ion-text color="pause" *ngIf="stopTimer || DMWaitingProvider?.second > 0">\n                    {{ DMWaitingProvider?.hour }}:{{ DMWaitingProvider?.minute }}:{{ DMWaitingProvider?.second }}\n                </h2>\n            </ion-col>\n            <ion-col size="2"></ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col *ngIf="DMMemberProvider?.drawMembers[0]">\n                <h4 ion-text color="primary" [ngClass]="{\'passou-tempo-sugerido\': DMMemberProvider?.drawMembers[0].passouTempoSugerido}">\n                    {{ DMMemberProvider?.drawMembers[0].nome }} {{ DMMemberProvider?.hour }}:{{ DMMemberProvider?.minute }}:{{ DMMemberProvider?.second }}\n                </h4>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <h6 ion-text color="primary" class="segunda-posicao">\n                    {{ DMMemberProvider?.drawMembers[1]?.nome }}\n                </h6>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <h6 ion-text color="primary">\n                    {{ DMMemberProvider?.drawMembers[2]?.nome }}\n                </h6>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <h6 ion-text color="primary" class="ultima-posicao">\n                    {{ DMMemberProvider?.drawMembers[3]?.nome }}\n                </h6>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n    <page-timer-per-member [show]="endDailyMeeting" [membros]="DMSharingProvider?.share?.members"></page-timer-per-member>\n</ion-content>\n<ion-footer>\n    <ion-toolbar>\n    <button ion-button icon-start full large="true" *ngIf="!endDailyMeeting"\n        (click)="nextMember()" [disabled]="stopTimer">\n            <ion-icon class="icon ion-md-timer ion-ios-timer"></ion-icon>\n            {{ firstAccessDailyMeeting? \'Start Daily Meeting\' : \'Next member\' }}\n    </button>\n    <button ion-button icon-start full color="secondary" *ngIf="!endDailyMeeting"\n        large="true" (click)="DMMemberProvider?.sendMemberToLast(timeLimit)" [disabled]="stopTimer || firstAccessDailyMeeting">\n            Move member to last\n    </button>\n    <button ion-button icon-start full color="pause" *ngIf="!stopTimer && !endDailyMeeting"\n        large="true" (click)="stopTimerDailyMeeting()" [disabled]="firstAccessDailyMeeting">\n            <ion-icon class="icon ion-md-pause ion-ios-pause"></ion-icon>\n            Pause timer\n    </button>\n    <button ion-button icon-start full *ngIf="stopTimer && !endDailyMeeting"\n        large="true" (click)="initTimerDailyMeeting()">\n            <ion-icon class="icon ion-md-play ion-ios-play"></ion-icon>\n            Resume timer\n    </button>\n    <page-button-shared [msg]="sharingMessage" *ngIf="endDailyMeeting"></page-button-shared>\n    </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/pages/timer-group/timer-group.html"*/,
        }),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])('DailyMeetingSharing')),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])('DailyMeetingMember')),
        __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])('DMMainInterfaceToken')),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_grupo_grupo__["a" /* GrupoProvider */], Object, Object, Array, __WEBPACK_IMPORTED_MODULE_1__ionic_native_insomnia__["a" /* Insomnia */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Platform */]])
    ], TimerGroupPage);
    return TimerGroupPage;
}());

//# sourceMappingURL=timer-group.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(228);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_admob_free__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_insomnia__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_button_add_member_button_add_member__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_button_shared_button_shared__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_group_selector_group_selector__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_group_group__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_settings_group_settings_group__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_timer_group_timer_group__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_timer_per_member_timer_per_member__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_daily_meeting_daily_meeting_main__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_daily_meeting_daily_meeting_member__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_daily_meeting_daily_meeting_sharing__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_daily_meeting_daily_meeting_waiting__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_grupo_grupo__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_grupo_membro__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__app_component__ = __webpack_require__(291);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























var DMMainInterfaceToken = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* InjectionToken */]('DailyMeetingMain');
var DMMemberInterfaceToken = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* InjectionToken */]('DailyMeetingMember');
var DMSharingInterfaceToken = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* InjectionToken */]('DailyMeetingSharing');
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_23__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_group_selector_group_selector__["a" /* GroupSelectorPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_group_group__["a" /* GroupPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_settings_group_settings_group__["a" /* SettingsGroupPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_timer_group_timer_group__["a" /* TimerGroupPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_timer_per_member_timer_per_member__["a" /* TimerPerMemberPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_button_add_member_button_add_member__["a" /* ButtonAddMemberPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_button_shared_button_shared__["a" /* ButtonSharedPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_23__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_9_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_23__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_group_selector_group_selector__["a" /* GroupSelectorPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_group_group__["a" /* GroupPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_settings_group_settings_group__["a" /* SettingsGroupPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_timer_group_timer_group__["a" /* TimerGroupPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_timer_per_member_timer_per_member__["a" /* TimerPerMemberPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_button_add_member_button_add_member__["a" /* ButtonAddMemberPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_button_shared_button_shared__["a" /* ButtonSharedPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_0__angular_common__["d" /* DatePipe */],
                __WEBPACK_IMPORTED_MODULE_21__providers_grupo_grupo__["a" /* GrupoProvider */],
                __WEBPACK_IMPORTED_MODULE_22__providers_grupo_membro__["a" /* MembroProvider */],
                { provide: 'DailyMeetingMember', useClass: __WEBPACK_IMPORTED_MODULE_18__providers_daily_meeting_daily_meeting_member__["a" /* DailyMeetingMemberProvider */] },
                { provide: 'DMMainInterfaceToken', useClass: __WEBPACK_IMPORTED_MODULE_17__providers_daily_meeting_daily_meeting_main__["a" /* DailyMeetingMainProvider */], multi: true },
                { provide: 'DMMainInterfaceToken', useClass: __WEBPACK_IMPORTED_MODULE_20__providers_daily_meeting_daily_meeting_waiting__["a" /* DailyMeetingWaitingProvider */], multi: true },
                { provide: 'DailyMeetingSharing', useClass: __WEBPACK_IMPORTED_MODULE_19__providers_daily_meeting_daily_meeting_sharing__["a" /* DailyMeetingSharingMessageProvider */] },
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_insomnia__["a" /* Insomnia */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_admob_free__["a" /* AdMobFree */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonAddMemberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contents_membro__ = __webpack_require__(281);
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
            selector: 'page-button-add-member',template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/pages/button-add-member/button-add-member.html"*/'<button item-start ion-button block outline icon-only large="true" (click)="openAddMembro()">\n    <ion-icon item-start class="icon ion-md-person-add ion-ios-person-add"></ion-icon>\n    Add member\n</button>\n'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/pages/button-add-member/button-add-member.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ButtonAddMemberPage);
    return ButtonAddMemberPage;
}());

//# sourceMappingURL=button-add-member.js.map

/***/ }),

/***/ 281:
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

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonSharedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_social_sharing__ = __webpack_require__(118);
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
            selector: 'page-button-shared',template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/pages/button-shared/button-shared.html"*/'<button ion-button icon-start full color="secondary" large="true" (click)="share()">\n        <ion-icon class="icon ion-md-share ion-ios-share"></ion-icon>\n        Share Time\n</button>\n'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/pages/button-shared/button-shared.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], ButtonSharedPage);
    return ButtonSharedPage;
}());

//# sourceMappingURL=button-shared.js.map

/***/ }),

/***/ 283:
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

/***/ 284:
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

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimerPerMemberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
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
            selector: 'page-timer-per-member',template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/pages/timer-per-member/timer-per-member.html"*/'<div *ngIf="show" >\n  <ion-grid *ngFor="let membro of membros">\n    <ion-row>\n        <ion-col>\n            <h6 ion-text color="primary">\n                {{ membro.nome }} ({{ membro.tempo }})\n            </h6>\n        </ion-col>\n    </ion-row>\n  </ion-grid>\n</div>\n'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/pages/timer-per-member/timer-per-member.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], TimerPerMemberPage);
    return TimerPerMemberPage;
}());

//# sourceMappingURL=timer-per-member.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DailyMeetingMainProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__aspects_time_aspect__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DailyMeetingMainProvider = /** @class */ (function () {
    function DailyMeetingMainProvider() {
    }
    DailyMeetingMainProvider.prototype.getTimeFormat = function () { return ''; };
    DailyMeetingMainProvider.prototype.resetTimer = function () { };
    DailyMeetingMainProvider.prototype.updateTime = function () { };
    DailyMeetingMainProvider.prototype.clearTimerInterval = function () {
        clearInterval(this.timerInterval);
    };
    DailyMeetingMainProvider.prototype.initTimerInterval = function () {
        var _this = this;
        this.timerInterval = setInterval(function () { return _this.updateTime(); }, 1000);
    };
    DailyMeetingMainProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        Object(__WEBPACK_IMPORTED_MODULE_1__aspects_time_aspect__["a" /* AspectTime */])()
    ], DailyMeetingMainProvider);
    return DailyMeetingMainProvider;
}());

//# sourceMappingURL=daily-meeting-main.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DailyMeetingMemberProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__aspects_time_aspect__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DailyMeetingMemberProvider = /** @class */ (function () {
    function DailyMeetingMemberProvider() {
        this.drawMembers = [];
    }
    DailyMeetingMemberProvider.prototype.getTimeFormat = function () {
        console.log('test');
        return '';
    };
    DailyMeetingMemberProvider.prototype.resetTimer = function () {
        console.log('test');
    };
    DailyMeetingMemberProvider.prototype.updateTime = function () {
        console.log('test');
    };
    DailyMeetingMemberProvider.prototype.clearTimerInterval = function () {
        clearInterval(this.timerInterval);
    };
    DailyMeetingMemberProvider.prototype.initTimerInterval = function (timeLimit) {
        var _this = this;
        this.timerInterval = setInterval(function () { return _this.updateTimeMember(timeLimit); }, 1000);
    };
    DailyMeetingMemberProvider.prototype.sendMemberToLast = function (timeLimit) {
        var member = this.drawMembers[0];
        this.drawMembers.splice(0, 1);
        this.drawMembers.splice(this.drawMembers.length, 0, member);
        this.clearTimerInterval();
        this.initTimerInterval(timeLimit);
        this.resetTimer();
    };
    DailyMeetingMemberProvider.prototype.drawingMembers = function (members) {
        var presentMembers = [];
        presentMembers = this.getPresentMembers(members);
        var drawValue = Math.floor((Math.random() * presentMembers.length));
        this.drawMembers.push(presentMembers[drawValue]);
        for (var i = drawValue + 1; i < presentMembers.length; i++) {
            this.drawMembers.push(presentMembers[i]);
        }
        for (var i = 0; i < drawValue; i++) {
            this.drawMembers.push(presentMembers[i]);
        }
    };
    DailyMeetingMemberProvider.prototype.updateTimeMember = function (timeLimit) {
        var tempoMemberLimite = this.calculateDecimalTime();
        this.updateTime();
        if (tempoMemberLimite >= timeLimit) {
            this.drawMembers[0].passouTempoSugerido = true;
        }
    };
    DailyMeetingMemberProvider.prototype.getPresentMembers = function (members) {
        var presentMembers = [];
        members.forEach(function (element) {
            if (element.presenca === true) {
                presentMembers.push(element);
            }
        });
        return presentMembers;
    };
    DailyMeetingMemberProvider.prototype.calculateDecimalTime = function () {
        var minutoSegundo = this.minuteNumber * 60;
        var horaSegundo = this.hourNumber * 3600;
        return horaSegundo + minutoSegundo + this.secondNumber;
    };
    DailyMeetingMemberProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        Object(__WEBPACK_IMPORTED_MODULE_1__aspects_time_aspect__["a" /* AspectTime */])()
    ], DailyMeetingMemberProvider);
    return DailyMeetingMemberProvider;
}());

//# sourceMappingURL=daily-meeting-member.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DailyMeetingSharingMessageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contents_sharing_message__ = __webpack_require__(289);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DailyMeetingSharingMessageProvider = /** @class */ (function () {
    function DailyMeetingSharingMessageProvider() {
        this.share = new __WEBPACK_IMPORTED_MODULE_1__contents_sharing_message__["a" /* SharingMessageContent */]();
        this.membersMessage = '';
    }
    DailyMeetingSharingMessageProvider.prototype.buildMessage = function () {
        this.share.message = 'Group: ' + this.share.title + '\n'
            + 'Suggested time per member: ' + this.share.timeLimit + '\n'
            + 'Standup time: ' + this.share.standupTime + '\n'
            + 'Time on hold: ' + this.share.timeWaited + '\n'
            + this.membersMessage;
    };
    DailyMeetingSharingMessageProvider.prototype.setMembersAndTime = function () {
        var _this = this;
        var membersWithTime = '-----MEMBERS-----';
        this.share.members.forEach(function (member) {
            membersWithTime += _this.formatMemberMessage(member);
        });
        this.membersMessage = membersWithTime.toString();
    };
    DailyMeetingSharingMessageProvider.prototype.setTimeMembers = function (time, currentMember) {
        this.share.members.push({
            id: currentMember.id,
            nome: currentMember.nome,
            tempo: time,
            presenca: currentMember.presenca,
            passouTempoSugerido: currentMember.passouTempoSugerido
        });
    };
    DailyMeetingSharingMessageProvider.prototype.formatMemberMessage = function (member) {
        var memberMessage = member.nome + '(' + member.tempo + ')';
        return member.passouTempoSugerido ?
            '\n' + '*' + memberMessage + '*' :
            '\n' + memberMessage;
    };
    DailyMeetingSharingMessageProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], DailyMeetingSharingMessageProvider);
    return DailyMeetingSharingMessageProvider;
}());

//# sourceMappingURL=daily-meeting-sharing.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharingMessageContent; });
var SharingMessageContent = /** @class */ (function () {
    function SharingMessageContent() {
        this.members = [];
    }
    return SharingMessageContent;
}());

//# sourceMappingURL=sharing-message.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DailyMeetingWaitingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__aspects_time_aspect__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DailyMeetingWaitingProvider = /** @class */ (function () {
    function DailyMeetingWaitingProvider() {
    }
    DailyMeetingWaitingProvider.prototype.getTimeFormat = function () { return ''; };
    DailyMeetingWaitingProvider.prototype.resetTimer = function () { };
    DailyMeetingWaitingProvider.prototype.updateTime = function () { };
    DailyMeetingWaitingProvider.prototype.clearTimerInterval = function () {
        clearInterval(this.timerInterval);
    };
    DailyMeetingWaitingProvider.prototype.initTimerInterval = function () {
        var _this = this;
        this.timerInterval = setInterval(function () { return _this.updateTime(); }, 1000);
    };
    DailyMeetingWaitingProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        Object(__WEBPACK_IMPORTED_MODULE_1__aspects_time_aspect__["a" /* AspectTime */])()
    ], DailyMeetingWaitingProvider);
    return DailyMeetingWaitingProvider;
}());

//# sourceMappingURL=daily-meeting-waiting.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_group_selector_group_selector__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_admob_free__ = __webpack_require__(115);
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
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/app/app.html"*/'<div *ngIf="showSplash" class="splash">\n    <div class="sk-folding-cube">\n        <div class="sk-cube1 sk-cube"></div>\n        <div class="sk-cube2 sk-cube"></div>\n        <div class="sk-cube4 sk-cube"></div>\n        <div class="sk-cube3 sk-cube"></div>\n    </div>\n</div>\n<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/eduardo/Documentos/Projects/team-timer-tcc/after-refactoring/src/app/app.html"*/
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

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GrupoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contents_Grupos__ = __webpack_require__(284);
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

/***/ })

},[205]);
//# sourceMappingURL=main.js.map
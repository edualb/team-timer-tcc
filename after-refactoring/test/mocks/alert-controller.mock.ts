import { 
  AlertController, 
  AlertOptions, 
  Alert, 
  App,
  Config,
  NavOptions,
} from "ionic-angular";

export class AlertControllerMock extends AlertController {

  app: App;
  config: Config;
  alert: AlertMock;

  constructor(app: App, config: Config) {
    super(app, config);
    this.app = app;
    this.config = config;
  }

  create(opts?: AlertOptions): Alert {
    this.alert = new AlertMock(
      this.app,
      opts,
      this.config
    );
    return this.alert;
  }
}

export class AlertMock extends Alert {

  alertOptions: AlertOptions;

  constructor(app: App, opts: AlertOptions, config: Config) {
    super(app, opts, config);
    this.alertOptions = opts;
  }

  present(navOptions?: NavOptions): Promise<any> {
    return new Promise<any>(resolve => {
      resolve(this.alertOptions);
    });
  }
} 
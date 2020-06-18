import { ToastController, App, Config, Platform, ToastOptions, Toast, NavOptions } from "ionic-angular";

export class ToastControllerMock extends ToastController {

  opts: ToastOptions;

  constructor() {
    super(new App(new Config(), new Platform), new Config())
  }

  create(opts?: ToastOptions): Toast {
    this.opts = opts;
    return new Toast(new App(new Config(), new Platform()), opts, new Config())
  }

}
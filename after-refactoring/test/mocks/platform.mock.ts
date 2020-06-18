import { Platform } from "ionic-angular";

export class PlatformMock extends Platform {
  
  isCordova: boolean = true

  ready(): Promise<string> {
    return new Promise<string>((resolve) => {
      resolve('done');
    });
  }

  is(platformName: string): boolean {
    return this.isCordova
  }
}
import { Insomnia } from "@ionic-native/insomnia";

export class InsomniaMock extends Insomnia {

  allowSleepAgain(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve('done');
    })
  }

  keepAwake(): Promise<any> {
    return Promise.resolve('done');
  }

}
import { IAspectTime } from "../providers/daily-meeting/interfaces/aspect-time.interface";

interface AspectOption {
  methods: string[]
  advice: string
  func: Function
}

const aspectOptions: AspectOption[] = [ 
  {
    methods: ['getTimeFormat'],
    advice: 'before',
    func: (target: any): string => {
      return target.hour + ':' + target.minute + ':' + target.second;
    }
  },
  {
    methods: ['resetTimer'],
    advice: 'before',
    func: (target: any) => {
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
    func: (target: any) => {
      timerCounting(target);
      convertTimeToString(target);
    }
  }
]

export function AspectTime() {
  return <T extends new (...args: any[]) => IAspectTime>(target: T) => {
    return class extends target {
      constructor(...args: any[]) {
        super(...args);
        this.hourNumber = 0;
        this.minuteNumber  = 0;
        this.secondNumber  = 0;
    
        this.hour = '00';
        this.minute = '00';
        this.second = '00';

        for (const propertyName in this) {
          const propertyValue = this[propertyName];
          const isMethod = propertyValue instanceof Function;
          if (!isMethod) {
            continue;
          }

          for (const aspect of aspectOptions) {
            for (const method of aspect.methods) {
              if (method === propertyName) {
                const descriptor = this.getMethodDescriptor(propertyName);
                const originalMethod = descriptor.value;
                Object.defineProperty(this, method, {
                  configurable: true,
                  enumerable: true,
                  writable: true,
                  value: () => {
                    if (aspect.advice === 'before') {
                      const value = aspect.func(this);
                      if (value !== undefined) {
                        return value
                      }
                    }

                    originalMethod.apply(this, args);

                    if (aspect.advice === 'after') {
                      const value = aspect.func(this);
                      if (value !== undefined) {
                        return value
                      }
                    }
                  }
                })
                break;
              }
            }
          }     
        }
      }

      getMethodDescriptor(propertyName: string): TypedPropertyDescriptor<any> {
        if (this.hasOwnProperty(propertyName))
            return Object.getOwnPropertyDescriptor(this, propertyName);

        return {
            configurable: true,
            enumerable: true,
            writable: true,
            value: this[propertyName]
        };
      }
    }
  }
}

function timerCounting(target: any) {
  if (target.secondNumber == 59) {
      if (target.minuteNumber == 59) {
        target.hourNumber++;
        target.minuteNumber = 0;
      } else target.minuteNumber++;
      target.secondNumber = 0;
  } else target.secondNumber++;
}

function convertTimeToString(target: any) {
  target.hour = setFormat(target.hourNumber);
  target.minute = setFormat(target.minuteNumber);
  target.second = setFormat(target.secondNumber);
}

function setFormat(timerNumber: number): string {
    let firstValue = timerNumber < 10 ? '0' : '';
    return firstValue + timerNumber.toString();
}

import { DailyMeetingMainProvider } from "../../src/providers/daily-meeting/daily-meeting-main";

describe('DailyMeetingMemberProvider', () => {

  let provider: DailyMeetingMainProvider;

  beforeEach(() => {
    provider = new DailyMeetingMainProvider();
  });

  it('DailyMeetingMainProvider initialized', () => {
    expect(provider).toBeTruthy();
    expect(provider.hour).toEqual('00');
    expect(provider.minute).toEqual('00');
    expect(provider.second).toEqual('00');
    expect(provider.hourNumber).toEqual(0);
    expect(provider.minuteNumber).toEqual(0);
    expect(provider.secondNumber).toEqual(0);
  });

  it('should be reset timer of members on zeraTempo', () => {
    provider.resetTimer();

    expect(provider.hour).toEqual('00');
    expect(provider.minute).toEqual('00');
    expect(provider.second).toEqual('00');
    expect(provider.hourNumber).toEqual(0);
    expect(provider.minuteNumber).toEqual(0);
    expect(provider.secondNumber).toEqual(0);
  });

  it('should be up second on upTimeMember', () => {
    provider.hourNumber = 0;
    provider.minuteNumber = 1;
    provider.secondNumber = 20;

    provider.updateTime();

    expect(provider.hourNumber).toEqual(0);
    expect(provider.minuteNumber).toEqual(1);
    expect(provider.secondNumber).toEqual(21);
    expect(provider.hour).toEqual('00');
    expect(provider.minute).toEqual('01');
    expect(provider.second).toEqual('21');
  });

  it('should be up minute on upTimeMember', () => {
    provider.hourNumber = 0;
    provider.minuteNumber = 0;
    provider.secondNumber = 59;

    provider.updateTime();

    expect(provider.hourNumber).toEqual(0);
    expect(provider.minuteNumber).toEqual(1);
    expect(provider.secondNumber).toEqual(0);
    expect(provider.hour).toEqual('00');
    expect(provider.minute).toEqual('01');
    expect(provider.second).toEqual('00');
  });

  it('should be up hour on upTimeMember', () => {
    provider.hourNumber = 0;
    provider.minuteNumber = 59;
    provider.secondNumber = 59;

    provider.updateTime();

    expect(provider.hourNumber).toEqual(1);
    expect(provider.minuteNumber).toEqual(0);
    expect(provider.secondNumber).toEqual(0);
    expect(provider.hour).toEqual('01');
    expect(provider.minute).toEqual('00');
    expect(provider.second).toEqual('00');
  });

  it('should be set passouTempoSugerido to true on upTimeMember', () => {
    provider.hourNumber = 0;
    provider.minuteNumber = 1;
    provider.secondNumber = 30;

    provider.updateTime();

    expect(provider.hourNumber).toEqual(0);
    expect(provider.minuteNumber).toEqual(1);
    expect(provider.secondNumber).toEqual(31);
    expect(provider.hour).toEqual('00');
    expect(provider.minute).toEqual('01');
    expect(provider.second).toEqual('31');
  });

})
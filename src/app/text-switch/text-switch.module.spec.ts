import { TextSwitchModule } from './text-switch.module';

describe('TextSwitchModule', () => {
  let textSwitchModule: TextSwitchModule;

  beforeEach(() => {
    textSwitchModule = new TextSwitchModule();
  });

  it('should create an instance', () => {
    expect(textSwitchModule).toBeTruthy();
  });
});

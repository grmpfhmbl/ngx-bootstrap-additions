import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TextSwitchComponent} from './text-switch.component';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {click} from '../../../testing/index';

@Component({
  template: `
    <app-text-switch [appendText]="appendText" [prependText]="prependText"
                     [onText]="onText" [offText]="offText"
                     [switchedOn]="isSwitchedOn"
                     (switchedOnChange)="switchedOnChanged($event)">
    </app-text-switch>`
})
class TestHostComponent {
  prependText = 'prepend text';
  appendText = 'append text';
  onText = 'on';
  offText = 'off';
  isSwitchedOn = false;

  switchedOnChanged(event: boolean) {
    this.isSwitchedOn = event;
  }
}

describe('TextSwitchComponent', () => {
  let component: TextSwitchComponent;
  let fixture: ComponentFixture<TextSwitchComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextSwitchComponent, TestHostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create TestHostComponent', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('.toggle(false/true) should switch off / on', () => {
    expect(component.switchedOn).toBeTruthy();
    component.toggle(false);
    expect(component.switchedOn).toBeFalsy();

    // should switch to false
    component.toggle(true);
    expect(component.switchedOn).toBeTruthy();
  });

  it('.toggle(true/false) should stay on / off', () => {
    expect(component.switchedOn).toBeTruthy();
    component.toggle(true);
    expect(component.switchedOn).toBeTruthy();

    component.toggle(false);
    expect(component.switchedOn).toBeFalsy();
    component.toggle(false);
    expect(component.switchedOn).toBeFalsy();
  });

  it('should have a <span> that contains prependText and appendText', () => {
    const outerSpan: HTMLElement = fixture.nativeElement;
    expect(outerSpan.textContent).toContain(component.prependText);
    expect(outerSpan.textContent).toContain(component.appendText);
  });

  it('should have two <span> that contain onText and offText', () => {
    const outerSpan: HTMLElement = fixture.nativeElement;
    const switchList = outerSpan.querySelectorAll('.switch-item');

    expect(switchList.length).toBe(2);

    expect(switchList[0].textContent).toBe(component.onText);
    expect(switchList[1].textContent).toBe(component.offText);
  });

  it('#HostComponent: prependText and appendText changes should be reflected in <span>', () => {
    const hostElem: HTMLElement = testHostFixture.nativeElement;
    const outerSpan = hostElem.querySelector('app-text-switch > span');
    const switchList = outerSpan.querySelectorAll('.switch-item');

    expect(outerSpan.textContent).toContain(testHostComponent.prependText);
    expect(outerSpan.textContent).toContain(testHostComponent.appendText);
  });

  it('#HostComponent: onText and offText changes should be reflected in <span>', () => {
    const hostElem: HTMLElement = testHostFixture.nativeElement;
    const outerSpan = hostElem.querySelector('app-text-switch > span');
    const switchList = outerSpan.querySelectorAll('.switch-item');

    expect(switchList[0].textContent).toContain(testHostComponent.onText);
    expect(switchList[1].textContent).toContain(testHostComponent.offText);
  });

  it('should change value when switch-items are clicked', () => {
    const switchDeList = testHostFixture.debugElement.queryAll(By.css('app-text-switch > span > .switch-item'));

    click(switchDeList[0].nativeElement);
    expect(testHostComponent.isSwitchedOn).toBeTruthy();

    click(switchDeList[1].nativeElement);
    expect(testHostComponent.isSwitchedOn).toBeFalsy();

    // clicking same side twice should not change a thing.
    click(switchDeList[1].nativeElement);
    expect(testHostComponent.isSwitchedOn).toBeFalsy();

    click(switchDeList[0].nativeElement);
    expect(testHostComponent.isSwitchedOn).toBeTruthy();

    // clicking same side twice should not change a thing.
    click(switchDeList[0].nativeElement);
    expect(testHostComponent.isSwitchedOn).toBeTruthy();
  });

  it('should flip true / false when carets are clicked', () => {
    const caretDeList = testHostFixture.debugElement.queryAll(By.css('app-text-switch > span > .fa'));

    const initialValue = testHostComponent.isSwitchedOn;
    // clicking the carets in the middle should flip back and forth no matter which one clicked
    click(caretDeList[0].nativeElement);
    expect(testHostComponent.isSwitchedOn).toBe(!initialValue);
    click(caretDeList[0].nativeElement);
    expect(testHostComponent.isSwitchedOn).toBe(initialValue);
    click(caretDeList[1].nativeElement);
    expect(testHostComponent.isSwitchedOn).toBe(!initialValue);
    click(caretDeList[1].nativeElement);
    expect(testHostComponent.isSwitchedOn).toBe(initialValue);
  });
});

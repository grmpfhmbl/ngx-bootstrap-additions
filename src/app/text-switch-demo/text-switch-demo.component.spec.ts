import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSwitchDemoComponent } from './text-switch-demo.component';

describe('TextSwitchDemoComponent', () => {
  let component: TextSwitchDemoComponent;
  let fixture: ComponentFixture<TextSwitchDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSwitchDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSwitchDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagInputDemoComponent } from './tag-input-demo.component';

describe('TagInputDemoComponent', () => {
  let component: TagInputDemoComponent;
  let fixture: ComponentFixture<TagInputDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagInputDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagInputDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

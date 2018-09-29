import {AfterViewInit, Component, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';

export const TEXT_SWITCH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextSwitchComponent),
  multi: true
};

/**
 * A switch component with two strings separated by <>.
 * TODO make "hover" style for the inactive part
 * TODO make tooltip
 * TODO make styling nicer (especially for the case of embeding into other stuff the font-color might not be nice.
 */
@Component({
  selector: 'app-text-switch',
  templateUrl: './text-switch.component.html',
  styleUrls: ['./text-switch.component.scss'],
  providers: [TEXT_SWITCH_VALUE_ACCESSOR]
})
export class TextSwitchComponent implements ControlValueAccessor, OnInit {
  // @ViewChild(NgModel) model: NgModel;

  @Input() prependText = '';
  @Input() appendText = '';

  @Input() onText = 'on';
  @Input() offText = 'off';

  @Input() switchOnValue: any = true;
  @Input() switchOffValue: any = false;

  @Input() caretLeftClass = 'caret-left';
  @Input() caretRightClass = 'caret-right';

  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() disabled = false;

  protected state = true;

  private changed = new Array<(value: any) => void>();
  private touched = new Array<() => void>();

  constructor() {
  }

  ngOnInit(): any {
    this.toggle(this.switchOnValue === this.value);
  }

  /** onClick handler for the text "buttons"
   * @param state boolean to indicate if switched on or off
   * */
  toggle(state: boolean): void {
    if (!this.disabled && this.state !== state) {
      this.state = state;
      this.value = state ? this.switchOnValue : this.switchOffValue;
      this.valueChange.emit(this.value);
      this.changed.forEach(f => f(this.value));
    }
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void) {
    this.changed.push(fn);
  }

  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }

  touch() {
    this.touched.forEach(f => f());
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.disabled !== isDisabled) {
      this.disabled = isDisabled;
    }
  }
}

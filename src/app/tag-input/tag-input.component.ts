import {
  Component,
  DoCheck,
  EventEmitter,
  forwardRef, Host, HostBinding, HostListener,
  Input,
  IterableDiffer,
  IterableDiffers,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import {isDefined} from '@angular/compiler/src/util';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const TAG_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TagInputComponent),
  multi: true
};


/**
 * Interface that describes a selectable Item for the TagInput
 */
export interface ITagInputItems {
  text: string;
  value: string;
}

/**
 * Taginput with Combobox
 *
 * TODO make stylable
 * TODO extract to own component module
 * TODO read items asynchronically from URL or Subject?
 * TODO make tool tip for remove button
 * TODO add "invalid" style in case an item is not in "available" list but pushed into "selected"
 * TODO add form validator stuff
 * FIXME what happens when we set "null" as value?
 */
@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
  providers: [TAG_INPUT_VALUE_ACCESSOR]
})
export class TagInputComponent implements OnChanges, DoCheck, ControlValueAccessor {
  @Input() availableValues: Array<ITagInputItems> = new Array<ITagInputItems>();

  @Input() value: Array<ITagInputItems> = new Array<ITagInputItems>();
  @Output() valueChange: EventEmitter<Array<ITagInputItems>> = new EventEmitter<Array<ITagInputItems>>();

  @Input() placeholder: String;

  @Input() multiselect = true;
  @Output() multiselectChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() disabled = false;

  // this is a hack. When I use [ngClass]="{'unavailable': !isValueAvailable(item)}" on the <li> then the
  // function isValueAvailable gets called 10 times per selected item... why?
  protected isValueUnavailableClass: Array<boolean> = new Array<boolean>();

  private valueIterableDiffer: IterableDiffer<ITagInputItems> | null;

  private changed = new Array<(value: any) => void>();
  private touched = new Array<() => void>();


  constructor(private iterableDiffers: IterableDiffers) {
    this.valueIterableDiffer = iterableDiffers.find(this.value).create();
    console.log(this.host);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['multiselect']) {
      // in case more than one is already selected, just delete all but the first.
      if (!changes['multiselect'].currentValue && this.value.length > 1) {
        this.value.length = 1;
        this.valueChange.emit(this.value);
        this.changed.forEach(f => f(this.value));
      }
      this.multiselect = changes['multiselect'].currentValue;
      this.multiselectChange.emit(this.multiselect);
    }

    if (changes.value) {
      console.log('ngOnChanges - value', changes.value);
      this.value = changes.value.currentValue;
      this.valueIterableDiffer = this.iterableDiffers.find(this.value).create();
      // this.isValueUnavailableClass = this.value.map((item) => !this.isValueAvailable(item));
    }
  }

  ngDoCheck(): void {
    const valueChanges = this.valueIterableDiffer.diff(this.value);
    if (valueChanges) {
      console.log('ngDoCheck');
      console.log(valueChanges);

      // FIXME check what happens when value is NULL
      this.isValueUnavailableClass = this.value.map((item) => !this.isValueAvailable(item));
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

  protected selectItem(item: ITagInputItems): void {
    console.log(`selectItem():`, item);
    if (!this.disabled) {
      if (!this.multiselect) {
        this.value.length = 0;
        this.isValueUnavailableClass.length = 0;
      }
      this.value.push(item);
      // this.isValueUnavailableClass.push(!this.isValueAvailable(item));
      this.valueChange.emit(this.value);
      this.changed.forEach(f => f(this.value));
    }
  }

  protected removeItem(item: ITagInputItems): void {
    console.log(`removeItem():`, item);
    if (!this.disabled) {
      const index = this.value.indexOf(item);
      this.value.splice(index, 1);
      // this.isValueUnavailableClass.splice(index, 1);
      this.valueChange.emit(this.value);
      this.changed.forEach(f => f(this.value));
    }
  }

  protected clearSelection(): void {
    console.log('clearSelection()');
    if (!this.disabled) {
      this.value.length = 0;
      // this.isValueUnavailableClass.length = 0;
      this.valueChange.emit(this.value);
      this.changed.forEach(f => f(this.value));
    }
  }

  protected isValueAvailable(item: ITagInputItems): boolean {
    const found = this.availableValues.find((val) => val.value === item.value && val.text === item.text);
    return isDefined(found);
  }
}

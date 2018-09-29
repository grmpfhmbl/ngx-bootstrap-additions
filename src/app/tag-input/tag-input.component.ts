import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  IterableDiffer,
  IterableDiffers,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {isDefined} from '@angular/compiler/src/util';


/**
 * Interface that describes a selectable Item for the TagInput
 */
export interface ITagInputItems {
  text: string;
  value: string;
}

/**
 * Taginput with Combobox and "all/any" switch
 *
 * @see TextSwitchComponent
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
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnChanges, DoCheck {

  @Input() availableValues: Array<ITagInputItems> = new Array<ITagInputItems>();

  @Input() value: Array<ITagInputItems> = new Array<ITagInputItems>();
  @Output() valueChange: EventEmitter<Array<ITagInputItems>> = new EventEmitter<Array<ITagInputItems>>();

  @Input() placeholder: String;

  @Input() isMultiselect = true;
  @Output() isMultiselectChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  // this is a hack. When I use [ngClass]="{'unavailable': !isValueAvailable(item)}" on the <li> then the
  // function isValueAvailable gets called 10 times per selected item... why?
  protected isValueUnavailableClass: Array<boolean> = new Array<boolean>();

  private valueIterableDiffer: IterableDiffer<ITagInputItems> | null;

  constructor(private iterableDiffers: IterableDiffers) {
    this.valueIterableDiffer = iterableDiffers.find(this.value).create();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isMultiselect) {
      // in case more than one is already selected, just delete all but the first.
      if (!changes.isMultiselect.currentValue && this.value.length > 1) {
        this.value.length = 1;
        this.valueChange.emit(this.value);
      }
      this.isMultiselect = changes.isMultiselect.currentValue;
      this.isMultiselectChange.emit(this.isMultiselect);
    }

    if (changes.value) {
      console.log('ngOnChanges - value');
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

  selectItem(item: ITagInputItems): void {
    console.log(`selectItem():`, item);
    if (!this.isMultiselect) {
      this.value.length = 0;
      this.isValueUnavailableClass.length = 0;
    }
    this.value.push(item);
    // this.isValueUnavailableClass.push(!this.isValueAvailable(item));
    this.valueChange.emit(this.value);
  }

  removeItem(item: ITagInputItems): void {
    console.log(`removeItem():`, item);
    const index = this.value.indexOf(item);
    this.value.splice(index, 1);
    // this.isValueUnavailableClass.splice(index, 1);
    this.valueChange.emit(this.value);
  }

  clearSelection(): void {
    console.log('clearSelection()');
    this.value.length = 0;
    // this.isValueUnavailableClass.length = 0;
    this.valueChange.emit(this.value);
  }

  protected isValueAvailable(item: ITagInputItems): boolean {
    const found = this.availableValues.find((val) => val.value === item.value && val.text === item.text);
    return isDefined(found);
  }


}

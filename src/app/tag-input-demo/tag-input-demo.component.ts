import {Component, OnInit} from '@angular/core';
import {ITagInputItems} from '../tag-input/tag-input.component';

@Component({
  selector: 'app-tag-input-demo',
  templateUrl: './tag-input-demo.component.html',
  styleUrls: ['./tag-input-demo.component.scss']
})
export class TagInputDemoComponent implements OnInit {

  availableItems: Array<ITagInputItems> = [
    {value: 'foo', text: 'foo'},
    {value: 'bar', text: 'bar'},
    {value: 'baz', text: 'baz'},
  ];

  invalidItem: ITagInputItems = {value: 'barbaz', text: 'barbaz'};

  tagValues: Array<Array<ITagInputItems>> = [[], [], [], [this.invalidItem]];

  isMultiSelect = true;

  constructor() {
  }

  ngOnInit() {
  }

  protected randomItem(): ITagInputItems {
    const str = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    return {text: str, value: str};

  }

}

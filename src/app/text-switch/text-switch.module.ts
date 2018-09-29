import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextSwitchComponent} from './text-switch.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TextSwitchComponent,
  ],
  exports: [
    TextSwitchComponent,
  ]
})
export class TextSwitchModule {
}

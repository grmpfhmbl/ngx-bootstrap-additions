import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

import {AppComponent} from './app.component';
import {TextSwitchModule} from './text-switch/text-switch.module';
import {ReactiveFormsModule} from '@angular/forms';
import { TextSwitchDemoComponent } from './text-switch-demo/text-switch-demo.component';
import {TagInputComponent} from './tag-input/tag-input.component';
import { TagInputDemoComponent } from './tag-input-demo/tag-input-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    TextSwitchDemoComponent,
    TagInputComponent,
    TagInputDemoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TextSwitchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {Component} from '@angular/core';
import {environment} from '../environments/environment';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  version = environment.VERSION;
  buildTimestamp = environment.BUILD_TIMESTAMP;
}

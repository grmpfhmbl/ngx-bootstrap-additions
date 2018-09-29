import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-text-switch-demo',
  templateUrl: './text-switch-demo.component.html',
  styleUrls: ['./text-switch-demo.component.scss']
})
export class TextSwitchDemoComponent implements OnInit {

  myModel = {
    'default': true,
    'text-change': true,
    'font-awesome': false,
    'in-badge': false,
    'custom-value': 'I like!'
  };

  formModel: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formModel = formBuilder.group({
      enableConsentSwitch: [false],
      consentSwitch: [{value: false, disabled: true}, Validators.requiredTrue]
    });

    this.formModel.get('enableConsentSwitch').valueChanges.subscribe((value) => {
      console.log(value);
      if (value) {
        this.formModel.get('consentSwitch').enable();
      } else {
        this.formModel.get('consentSwitch').disable();
      }
    });
  }

  get f(): { [p: string]: AbstractControl } {
    return this.formModel.controls;
  }

  ngOnInit() {

  }
}

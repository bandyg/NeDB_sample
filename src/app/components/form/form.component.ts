import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {

    
  }

  requiredChange(required: boolean): void {
    if (!required) {
      this.validateForm.get('nickname').clearValidators();
      this.validateForm.get('nickname').markAsPristine();
    } else {
      this.validateForm.get('nickname').setValidators(Validators.required);
      this.validateForm.get('nickname').markAsDirty();
    }
    this.validateForm.get('nickname').updateValueAndValidity();
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      sex: ['F'],
      textValue: [null],
      required: [false]
    });
  }

  presetComment(): string {
    return 'This is the preset comment';
  }

}

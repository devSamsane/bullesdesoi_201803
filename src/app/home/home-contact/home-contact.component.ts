import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RECAPTCHA_URL } from '../../shared/recaptcha/recaptcha.directive';

@Component({
  selector: 'bds-home-contact',
  templateUrl: './home-contact.component.html',
  styleUrls: ['./home-contact.component.scss'],
  providers: [{
    provide: RECAPTCHA_URL,
    useValue: 'http://localhost:3000/api/recaptcha'
  }]
})
export class HomeContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      lastname: new FormControl('', { validators: [Validators.required] }),
      firstname: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      phone: new FormControl(''),
      comment: new FormControl('', { validators: [Validators.required] }),
      captcha: new FormControl('')
    });
  }

  submitFormData() {

  }

}

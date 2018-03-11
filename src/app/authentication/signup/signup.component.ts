import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bds-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errors: string[] = [];

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', { validators: [Validators.required] }),
      lastName: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required] }),
      password: new FormControl('', { validators: [Validators.required] }),
      confirmPassword: new FormControl('', { validators: [Validators.required] }),
      phone: new FormControl('', { validators: [Validators.required] }),
    });
  }

  signup(form) {
    if (form.email && form.password && form.password === form.confirmPassword) {
      this.authService.signup(form)
        .subscribe(
        data => {
            // TODO: Supprimer la console
            console.log(data);
            this.router.navigateByUrl('/');
            // TODO: Mettre une méthode avec snackbar
            console.log('User créé avec succés');
          },
          error => this.errors = error
      );
    }
    this.signupForm.reset();
  }

}


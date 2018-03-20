import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'bds-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  messagePerErrorCode = {
    loginFailed: 'Mot de passe et/ou email invalides'
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] })
    });
  }

  signin(form) {
    if (form.email && form.password) {
      console.log(form.email);
      this.authService.signin(form.email, form.password)
        .subscribe(() => {
          console.log('user authentifié');
          this.router.navigateByUrl('/');
        });
    }

  }
}

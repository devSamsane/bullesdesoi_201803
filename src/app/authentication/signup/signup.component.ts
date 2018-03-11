import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';
import { AuthService } from '../auth.service';
import { ToasterService } from '../../shared/services/toaster/toaster.service';

@Component({
  selector: 'bds-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errors: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToasterService

  ) { }

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
            this.toaster.showInformationToaster('Utilisateur créé avec succès', 'bds-toast-information');
          },
          error => this.toaster.showAlertToaster(`Erreur à la création de l'utilisateur`, `bds-toast-alert`)
      );
    }
    this.signupForm.reset();
  }

}


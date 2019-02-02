import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { environment } from 'src/environments/environment';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.submitted = true;

    this.loading = true;
    this.authenticationService
      .login(this.model.username, this.model.password)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([environment.postLoginRoute]);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}

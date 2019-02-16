import { Component } from '@angular/core';
import { SignUpService } from '../_services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent {
  minLengthUsername = 6;
  minLengthPassword = 12;
  model: any = {
    username: '',
    password: '',
    email: ''
  };
  error: string;

  constructor(private router: Router, private signupService: SignUpService) {}

  onSubmit() {
    this.signupService.signup(this.model).subscribe(
      () => {
        this.model.submitted = true;
        this.router.navigate(['login']);
      },
      error => {
        this.error = error;
      }
    );
  }
}

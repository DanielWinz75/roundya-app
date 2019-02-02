import { Component } from '@angular/core';

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
    password: ''
  };

  onSubmit() {
    this.model.submitted = true;
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));
  }
}

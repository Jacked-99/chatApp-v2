import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  auth = inject(Auth);
  user = user(this.auth);
  userSub: Subscription;
  loginVal = '';
  loginForm: FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
    });
    this.userSub = this.user.subscribe((userVal) => {
      console.log(userVal);
    });
  }
  constructor(private loginService: UserService, private router: Router) {}
  onSubmit() {
    console.log(this.loginForm.value);
    this.loginService.setUser(this.loginForm.value['login']);
    this.router.navigate(['']);
  }
  checkValid(login: any) {
    if (login.invalid && login.touched) {
      return 'border-red-500';
    }
    return '';
  }
  onGoogleClick() {
    this.loginService.GoogleSignIn();
  }
}

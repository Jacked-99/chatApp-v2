import { Injectable, inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, tap, pipe } from 'rxjs';
import { Auth, user, User } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserInterface } from './shared/user';
import { data } from 'autoprefixer';
import { UserModel } from './shared/user.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // userSubject = new Subject();
  auth: Auth = inject(Auth);
  aUser = user(this.auth);
  user: UserInterface | null = null;
  userSub = new BehaviorSubject<UserModel | null>(null);
  constructor(private router: Router, private client: HttpClient) {}

  setUser(user: User | null) {
    // const data: UserModel = {
    //   userName: user.providerData[0].displayName,
    //   avatar: user.providerData[0].photoURL,
    //   loggedIn: true,
    // };
    // this.userSub.next(data);
  }
  // singInWithEmail(){
  //   this.client.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCi9DkP4sHAV465Gu6hfQ4t_Gvicn9Mcg")

  // }

  async GoogleSignIn() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);
    if (credential.user.emailVerified) {
      console.log(credential);
      this.router.navigate(['/']);
    }
  }
  async logOut() {
    await this.auth.signOut();
  }
}

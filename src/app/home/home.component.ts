import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  auth: Auth = inject(Auth);
  user = user(this.auth);
  userSubs: Subscription;
  loggedIn = false;
  displayUsers = false;
  windowWidth = 0;
  constructor(private userS: UserService, private route: Router) {}
  ngOnInit(): void {
    // this.user.user != '' ? (this.loggedIn = true) : (this.loggedIn = false);
    // if (!this.loggedIn) {
    //   this.route.navigate(['login']);
    // }
    this.windowWidth = window.screen.width;
    this.userSubs = this.user.subscribe((aUser: User | null) => {
      // this.userS.setUser(aUser != null ? aUser.displayName : null);
    });
  }

  onLogout() {
    this.userS.logOut();
  }
  onShowUser() {
    this.displayUsers = !this.displayUsers;
  }
  changeVisibilty() {
    if (this.windowWidth < 400) {
      return this.displayUsers ? 'show' : 'notshow';
    } else {
      return '';
    }
  }
  ngOnDestroy(): void {}
}

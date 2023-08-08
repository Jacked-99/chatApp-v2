import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UserService } from '../user.service';
import { map, take } from 'rxjs';
import { Auth, user } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const userVal = user(auth);

  const router = inject(Router);
  // const user = inject(UserService);

  return userVal.pipe(
    take(1),
    map((user) => {
      console.log(user);
      const isAuth = !!user;
      if (!isAuth) {
        return router.createUrlTree(['/login']);
      } else {
        return true;
      }
    })
  );
};

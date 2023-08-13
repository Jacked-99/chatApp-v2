import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userS = inject(UserService);
  const user = userS.getUser();
  const router = inject(Router);

  return user.pipe(
    map((user) => {
      if (!user) {
        return router.createUrlTree(['/login']);
      } else {
        return true;
      }
    })
  );
};

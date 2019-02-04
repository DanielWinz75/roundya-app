import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckTokenNotExistsService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // navigate to places if token available, avoid double signup
    if (localStorage.getItem('token')) {
      this.router.navigate([environment.postLoginRoute]);
      return false;
    } else {
      return true;
    }
  }
}

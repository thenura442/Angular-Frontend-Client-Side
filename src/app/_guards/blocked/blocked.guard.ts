import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})



export class BlockedGuard implements CanActivate {

  constructor(private router:Router, private storageService: StorageService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.storageService.getUser();
      if (currentUser.dle_access == 'open') {
          return true;
      }
      else if (currentUser.dle_access == 'temp'){

      }
      // blocked so redirect to blocked page
      this.router.navigate(['/blocked']);
      return false;
  }

}

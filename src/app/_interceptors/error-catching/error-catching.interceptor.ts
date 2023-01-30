import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 400 || err.status === 401 || err.status === 402 || err.status === 403 || err.status === 404 || err.status === 405) {
        this.router.navigateByUrl('/client-error');
        return of(err.message);
    }
    this.router.navigateByUrl('/server-error');
    return throwError(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
    });

    return next.handle(req).pipe(catchError(x=> this.handleAuthError(x)));
  }
}


export const HttpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useFactory: function(router: Router) {
      return new ErrorCatchingInterceptor(router);
    },
    useClass: ErrorCatchingInterceptor,
    multi: true,
    deps: [Router]
  },
]

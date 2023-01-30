import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
    });

    return next.handle(req);
  }
}

// export const HttpInterceptorProviders = [
//   {
//     provide: HTTP_INTERCEPTORS,
//     useFactory: function(router: Router) {
//       return new ErrorCatchingInterceptor(router);
//     },
//     useClass: HttpRequestInterceptor,
//     multi: true,
//     deps: [Router]
//   },
// ]

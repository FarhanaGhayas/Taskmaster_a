import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/authservice';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

   // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(AuthService).getToken();

     // If the token exists, attach it as a Bearer token
  const newReq = authToken
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      })
    : req;

  return next(newReq);
};

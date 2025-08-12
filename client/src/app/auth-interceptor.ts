import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/authservice';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

   // Inject the current `AuthService` and use it to get an authentication token:
    const authService = inject(AuthService);
  const authToken = authService.getToken();

     // If the token exists, attach it as a Bearer token
  const newReq = authToken
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      })
    : req;

  //return next(newReq);
  return next(newReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        // Token expired or invalid → log out user
        authService.logout();
        // Optional: redirect to login here or handle inside logout
      }
      return throwError(() => err);
    })
  );
  
};

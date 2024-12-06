import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService)
  const loginUrls = `/users/signin`;
  const signUpUrls = `users/signup`;
  const token = localStorage.getItem('token');
  if (req.url.includes(loginUrls) || req.url.includes(signUpUrls)) {
    return next(req);
  }

  if (token && !authService.isTokenExpired(token)) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  } else {
    authService.logout();
    return throwError(() =>  {
      new Error('Token expired or not available')
    });
  }
};

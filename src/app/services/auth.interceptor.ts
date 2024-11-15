import { inject } from '@angular/core';
import { AppService } from './app.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const appService = inject(AppService);
  const authService = inject(AuthServiceService)
  const loginUrls = `/users/signin`;
  const token = localStorage.getItem('token');
  if (req.url.includes(loginUrls)) {
    return next(req);
  }

  if (token && !appService.isTokenExpired(token)) {
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
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  // Check if URL contains addAuth=true
  const url = new URL(req.url, window.location.origin);

  if (url.searchParams.get('addAuth') === 'true') {
    // Add Authorization header only if addAuth=true
    const authRequest = req.clone({
      setHeaders: {
        'Authorization': cookieService.get('Authorization')
      }
    });
    return next(authRequest);
  }

  // Else, send the request as-is
  return next(req);
};

import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { JwtTokenService } from '../services/jwt-token.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authToken = inject(JwtTokenService).getToken();

  if (authToken) {
    const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${authToken}`) });
    return next(authReq);
  }
  return next(req);
};

import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageService, keys } from '../services/local-storage.service';
import { inject } from '@angular/core';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  const selectedTenantId = inject(LocalStorageService).getItem<string>(
    keys.SELECTED_TENANT_ID,
  );

  if (!selectedTenantId) return next(req);

  const newReq = req.clone({
    headers: req.headers.append('T-TenantId', selectedTenantId),
  });

  return next(newReq);
};
